console.log("Server started");
const fs = require('fs').promises;

var process = require('process')
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
});

const http = require('http');
const server = http.createServer(function(request, res) {
  // process HTTP request.
  fs.readFile(__dirname + "/index.html")
        .then(contents => {
            result = contents.toString().replace(/%count%/g,CLIENTS.length);
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(result);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        }); 
});
const WebSocketServer = require('ws');

const wss = new WebSocketServer.Server({ server });
CLIENTS=[];

wss.on('connection', function(ws) {
  CLIENTS.push(ws);
  ws.on('message', function(message) {
  console.log('Received from client: %s', message);
  ws.send('Server received from client: ' + message);
})});

server.listen(8080);

 

