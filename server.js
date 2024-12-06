"use strict";

import { serveFile, serveDir } from "jsr:@std/http/file-server";

// Sends a message as { event: event, data: data } to `socket` (i.e. a connection)
function send(socket, event, data) {
  socket.send(JSON.stringify({ event, data }));
}
  
// Sends a message to all current connections (sockets)
// Kommer denna att behövas?
// function broadcast(event, data) {
//   for (const guest in STATE.connections) {
//     const connection = STATE.connections[guest];
//     send(connection, event, data);
//   }
// }


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
              creator = client;
            }
          }

          STATE.roomID = generateRoomID();
          const room = {
            "id": STATE.roomID,
            "players": [],
            "selectedTheme": message.data.selectedTheme
          };
          
          room.players.push(creator);
          STATE.rooms.push(room);

          send(socket, "create", room);

          break;
        }

        case "join": {
          clientID = message.data.clientID;
          gameID = message.data.gameID;

          const game = GAMES[gameID];

          if (game.clients.length >= 2) {
            console.log(`[SERVER]: Max. players reached`);
          }

          const color = {"0": "orange", "1": "purple"}[GAMES.clients.length];
          game.clients.push({
            "clientID": clientID,
            "color": color
          });

          if (game.clients.length === 2) {
            //starta spelet!
          }

          //här/ovan? vill vi skicka spelet till båda spelarna

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
      // delete clients[clientID];
    });

    socket.addEventListener("error", (error) => {
      console.log(`[SERVER]: Error ${error}`);
    });

    return response;
  }
}); 