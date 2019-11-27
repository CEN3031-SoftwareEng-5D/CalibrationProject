const express = require('express'),
      upload = require('./upload'),
      cors = require('cors');
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

const server = express();


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(express.json());
server.use(express.urlencoded());

server.post('/upload', upload);

server.post('/uuid', function (req, res) {
    const uuid = req.body.uuid;
    exports.uuid = uuid;
});

server.listen(PORT, () => {
    console.log('Server started!');
});