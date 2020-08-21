console.log("Server started");
var Msg = '';

var process = require('process')
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
});

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8080});
    wss.on('connection', function(ws) {
        ws.on('message', function(message) {
        console.log('Received from client: %s', message);
        ws.send('Server received from client: ' + message);
    });
 });
