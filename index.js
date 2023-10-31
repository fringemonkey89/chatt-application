const express = require('express')
const fs = require('fs');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);

app.use(cors());

app.use('/public', express.static('public', {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('error loading index.html');
      } else {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(data);
      }
    });
  });
  



const io = require('socket.io')(server);
const port = 5000;

//server.on('request', cors());


io.on('connection', (socket)=> {
    socket.on('send name', (user) => {
        io.emit('send name', user) ;
    })
    socket.on('send message', (chat) => {
        io.emit('send message', chat) ;
    })
})

server.listen(port, () => {
    console.log(`server is listening at the port: ${port}`)
})