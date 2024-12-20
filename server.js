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
  let d = new Date().getTime();
	
	if( globalThis.performance && typeof globalThis.performance.now === "function" )
	{
		d += performance.now();
	}
	
	const uuid = 'xxxxxxxx-xxxx-8xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
	{
		const r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});

  return uuid;
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

async function getDatabase () {
  try {
    const json = await Deno.readTextFile("static/data.json");
    const db = JSON.parse(json);
    return db;
  } catch (err) {
    console.error("[CLIENT]: ERROR reading JSON file", err);
  }
}


//hashmap
const STATE = {
  "clients": [],
  "clientID": null,
  "rooms": [],
  "roomID": null
};

let db = null;

//server
Deno.serve( {
  port: 8888,
  handler: (rqst) => {

    if (rqst.headers.get("upgrade") != "websocket"){
      return handleHTTPRequest(rqst);
    }

    const { socket, response } = Deno.upgradeWebSocket(rqst);
    
    socket.addEventListener("open", async () => {
      STATE.clientID = generateClientID();
      
      STATE.clients.push({
        "id": STATE.clientID,
        "connection": socket
      });

      db = await getDatabase();

      send(socket, "connect", {"clientID": STATE.clientID, "db": db});
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
          try {
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
                  break;
                }
  
                room.players.push(player); 
                broadcastToRoom(STATE.roomID, "join", room);
                break;
              } 
            }
          } catch(err) {
            console.log(`[SERVER]: No room with this ID was found`);
            send(socket, "join", {"Error": err, "Description": "Unable to find a room with this ID"});
          }
            break;
          }

        case "pickChar": {
            STATE.roomID = message.data.roomID;
            STATE.clientID = message.data.clientID;
  
            for (const room of STATE.rooms) {        
              if (room.id === STATE.roomID) {
  
                for (const player of room.players) {
                  if (player.id === STATE.clientID) {
                    player["selectedChar"] = message.data.selectedChar;
                    broadcastToRoom(STATE.roomID, "pickChar", room);                  
                    break;
                  }
                }
              }
            }
          break;
        }

        case "start": {
          STATE.roomID = message.data.roomID;
          STATE.clientID = message.data.clientID;

          for (const room of STATE.rooms) {
            if (room.id === STATE.roomID) {
              for (const player of room.players) {
                player.isTurn = room.players.indexOf(player) === 0 ;
              }
              broadcastToRoom(STATE.roomID, "start", room);
              break;
            }
          }
          break;
        }

        case "question": 

          break;
        
        case "answer": 

          break;
        
        case "guess": {
          STATE.roomID = message.data.roomID;
          STATE.clientID = message.data.clientID;
          
          const guess = message.data.guess;

          for (const room of STATE.rooms) {        
            if (room.id === STATE.roomID) {

              for (const player of room.players) {
                if (player.id != STATE.clientID) {
                  if (player.selectedChar.name === guess.name) {
                    broadcastToRoom(STATE.roomID, "guess", {Guess: "Correct"});
                    break;
                  } else {
                    broadcastToRoom(STATE.roomID, "guess", {Guess: "Wrong"});
                  }
                }
              }
            }
          }
          break;
        }

        case "switchTurns": {
          STATE.clientID = message.data.clientID;
          STATE.roomID = message.data.roomID;

          for (const room of STATE.rooms) {        
            if (room.id === STATE.roomID) {
              for (const player of room.players) {
                if (player.id === STATE.clientID){
                  player.isTurn = false;
                } else {
                  player.isTurn = true;
                }
              }
            }
            broadcastToRoom(STATE.roomID, "switchTurns", room);
          }
          break;
        }
      
        case "rematch": 

          break;
        
        default:
          console.log(`[SERVER]: Error :: Unknown event '${message.event}'`);
          break;
      }
    });
  

    socket.addEventListener("close", () => {
      console.log(`[SERVER]: Disconnect :: Goodbye ${STATE.clientID}`);

      for (const client of STATE.clients) {
        if (client.id === STATE.clientID) {
          const i = STATE.clients.indexOf(client);
          STATE.clients.splice(i,1);
        }
      }

      for (const room of STATE.rooms) {
        for (const player of room.players) {
          if (player.id === STATE.clientID) {
            const i = room.players.indexOf(player);
            room.players.splice(i,1);
          }

          if (room.players.length === 0) {
            const i = STATE.rooms.indexOf(room);
            STATE.rooms.splice(i, 1);
            console.log(`Room with ${STATE.roomID} was deleted`);
          }
        }
      }

      console.log ("The currenct clients are:", STATE.clients);
      console.log("The current rooms are:", STATE.rooms);
      
    });

    socket.addEventListener("error", (error) => {
      console.log(`[SERVER]: Error ${error}`);
    });

    return response;
  }
});
