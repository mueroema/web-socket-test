console.log("Server started");
const fs = require('fs').promises;

var process = require('process')
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
});

const http = require('http');
const server = http.createServer(function (request, res) {
  // process HTTP request.
  fs.readFile(__dirname + "/index.html")
    .then(contents => {
      result = contents.toString().replace(/%count%/g, CLIENTS.length).replace(/%hostname%/g,process.env.HOSTNAME || 'localhost');
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
CLIENTS = [];

wss.on('connection', function (ws) {
  CLIENTS.push(ws);
  if ( process.env.DEBUG == "true" ) { console.log('open Session: %s', ws)};
  ws.on('message', function (message) {
    if ( process.env.DEBUG == "true" ) { console.log('Received from client: %s', message)};
    ws.send('Server received from client: ' + message);
  });
  ws.on('close', function (ws) {
    if ( process.env.DEBUG == "true" ) { console.log('close Session: %s', ws)}; 
    CLIENTS.pop(ws);
  })
});

server.listen(8080);
