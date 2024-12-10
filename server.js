"use strict";

import { serveFile, serveDir } from "jsr:@std/http/file-server";

// Sends a message as { event: event, data: data } to `socket` (i.e. a connection)
function send(socket, event, data) {
  socket.send(JSON.stringify({ event, data }));
}
  
// Sends a message to all current connections (sockets) i rummet
function broadcastToRoom(roomID, event, data) {
  for (const room of STATE.rooms) {
    if (room.id === roomID) {
      for (const player of room.players) {
        send(player.connection, event, data);
      }
    }
  }
}


function generateClientID() {
  const id = crypto.randomUUID();
  return id;
}


function generateRoomID() {
  const allowedChars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const strLen = 6;
  let roomID = "";

  for (let i = 0; i < strLen; i++) {
    roomID += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  }

  if (!/\d/.test(roomID)) {
      return generateRoomID();
  }

  return roomID;
}

function handleHTTPRequest(rqst) {
  const pathname = new URL(rqst.url).pathname;

  if (pathname.startsWith("/static")) {
    return serveDir(rqst, { fsRoot: "static", urlRoot: "static" });
  } else if (pathname.startsWith("/components")) {
    return serveDir(rqst, { fsRoot: "components", urlRoot: "components" });
  } else if (pathname.startsWith("/media")) {
    return serveDir(rqst, { fsRoot: "media", urlRoot: "media"});
  } else if (pathname.startsWith("/public")) {
    return serveDir(rqst, { fsRoot: "public", urlRoot: "public"})
  }

  return serveFile(rqst, "./index.html"); 
}


//hashmap
//allt detta är STATE
const STATE = {
  "clients": [],
  "clientID": null,
  "rooms": [],
  "roomID": null
};

//server
Deno.serve( {
  port: 8888,
  handler: (rqst) => {

    if (rqst.headers.get("upgrade") != "websocket"){
      return handleHTTPRequest(rqst);
    }

    const { socket, response } = Deno.upgradeWebSocket(rqst);
    
    socket.addEventListener("open", () => {
      STATE.clientID = generateClientID();
      
      STATE.clients.push({
        "id": STATE.clientID,
        "connection": socket
      });

      send(socket, "connect", {"clientID": STATE.clientID});
      console.log(`[SERVER]: WebSocket connection opened.`);
    });

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      console.log("[SERVER]: Message :: ", message);
  
      switch (message.event) {
        /* Gör om till funktioner som bara anropas här? */

        case "create": {
          let creator = null;
          for (const client of STATE.clients) {     
            if (client["id"] === STATE.clientID) {
              client["name"] = message.data.inputName;
              creator = client;
              creator.color = "orange";
            }
          }

          STATE.roomID = generateRoomID();
          const room = {
            "id": STATE.roomID,
            "selectedTheme": message.data.theme,
            "players": [],
          };
          
          room.players.push(creator);
          STATE.rooms.push(room);

          send(socket, "create", room);

          break;
        }

        case "join": {
          STATE.clientID = message.data.clientID;
          STATE.roomID = message.data.roomID;

          let player = null;

          for (const client of STATE.clients) {
            
            if (client.id === STATE.clientID) {
              player = client;
              player.name = message.data.name;
              player.color = "purple";
            }

          }

          for (const room of STATE.rooms) {        

            if (room.id === STATE.roomID) {

              if (room.players.length === 2) {
                console.log(`[SERVER]: Max. players reached`);
              }

              room.players.push(player); 
              broadcastToRoom(STATE.roomID, "join", room);

              break;
            } else {
              console.log(`[SERVER]: No room with this ID was found`);
              send(socket, "join", {"Error": "Unable to find a room with this ID"});
            }
  
          }
          break;
        }

        case "pickChar": {
          console.log(message.data);

          /* Om det finns 2 spelare i rummet så ska detta broadcastas till alla */
          break;
        }

        case "question": 

          break;
        
        case "answer": 

          break;
        
        case "guess": 

          break;

        case "rematch": 

          break;
        
        default:
          console.log(`[SERVER]: Error :: Unknown event '${message.event}'`);
          break;
      }
    });

    socket.addEventListener("close", () => {
      console.log(`[SERVER]: Disconnect :: Goodbye ${STATE.clientID}`);
      /* Ta bort klienten */
      // delete clients[clientID];

      /* Om rummet inte har några spelare kvar, ta bort*/
    });

    socket.addEventListener("error", (error) => {
      console.log(`[SERVER]: Error ${error}`);
    });

    return response;
  }
}); 