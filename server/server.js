const express = require('express'),
      upload = require('./upload'),
      cors = require('cors');
var listFilesModule = require('./listFiles.js'); 
var bodyParser = require('body-parser');

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

server.get('/getFiles', function (req, res) {
    console.log("here");
    listFilesModule.data.listFiles();
    setTimeout(function () {
        const files = listFilesModule.files;
        //console.log(files);
        res.send(JSON.stringify(files));
    }, 4000);
    
    
});

server.listen(5000, () => {
    console.log('Server started!');
});
