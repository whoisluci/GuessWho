import { serveFile, serveDir } from "jsr:@std/http/file-server";
  
  // Sends a message as { event: event, data: data } to `socket` (i.e. a connection)
  function send(socket, event, data) {
    socket.send(JSON.stringify({ event, data }));
  }
  
  // Sends a message to all current connections (sockets)
  // function broadcast(event, data) {
  //   for (const guest in STATE.connections) {
  //     const connection = STATE.connections[guest];
  //     send(connection, event, data);
  //   }
  // }

  function generateClientId() {
    const id = Math.floor(Math.random() * 10000);
    return id;
  }

  function handleHTTPRequest(rqst) {
    const pathname = new URL(rqst.url).pathname;
  
    if (pathname.startsWith("/static")) {
      return serveDir(rqst, { fsRoot: "static", urlRoot: "static" });
    } else if (pathname.startsWith("/components")) {
      return serveDir(rqst, { fsRoot: "components", urlRoot: "components" });
    }
    return serveFile(rqst, "./index.html"); 
  }
  


//hashmap
const clients = {};

Deno.serve( {
  port: 8888,
  handler: (rqst) => {

    if (rqst.headers.get("upgrade") != "websocket"){
      return handleHTTPRequest(rqst);
    }

    const { socket, response } = Deno.upgradeWebSocket(rqst);
    
    socket.onopen = () => {
        console.log(`[SERVER]: WebSocket connection opened.`);
    };

    socket.onmessage = (event) => {
        //const result = JSON.parse(message.utf8Data);

        // if (event.data === "ping") {
        //     socket.send("pong");
        // }

        //I have received a message from the client

        //switch case t.ex. case "guest:join", case "guest:leave", case "chat:message"
    };

    socket.onerror = (error) => {
      console.log(`[SERVER]: Error ${error}`);
    };

    const clientId = generateClientId();
    clients[clientId] = {
      "connection": socket,
      //more...
    };

    const payLoad = {
      "event": "connect",
      "clientId": clientId
    }

    //socket.send(JSON.stringify(payLoad));

    return response;
  }
});
  