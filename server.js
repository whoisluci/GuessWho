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
    const id = crypto.randomUUID;
    return id;
  }


function generateGameID() {
  const allowedChars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const strLen = 6;
  let gameID = "";

  for (let i = 0; i < strLen; i++) {
      gameID += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  }

  if (!/\d/.test(gameID)) {
      return generateGameID();
  }

  return gameID;
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
const clients = {};
const GAMES = [];

let clientID = null;
let gameID = null;

//server
Deno.serve( {
  port: 8888,
  handler: (rqst) => {

    if (rqst.headers.get("upgrade") != "websocket"){
      return handleHTTPRequest(rqst);
    }

    const { socket, response } = Deno.upgradeWebSocket(rqst);
    
    socket.onopen = () => {
    
      clientID = generateClientID();
      clients[clientID] = {
        "connection": socket
      };

      console.log(`[SERVER]: WebSocket connection opened.`);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      console.log("[SERVER]: Message :: ", message);
  
      switch (message.event) {
        case "connect":
          //gör om koden till funktioner?

          send(socket, "connect", clientID)
          break;

        case "create":
          gameID = generateGameID();
          GAMES[gameID] = {
            "id": gameID,
            "clients": [],
            //mer information
          };

          send(socket, "create", GAMES[gameID]);

          break;

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
    };

    socket.onclose = () => {
      console.log(`[SERVER]: Disconnect :: Goodbye ${clients[clientID]}`);
      delete clients[clientID];
    };

    socket.onerror = (error) => {
      console.log(`[SERVER]: Error ${error}`);
    };

    return response;
  }
}); 