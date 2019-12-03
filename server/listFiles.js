const BUCKET_NAME = 'calfilesx';
const fs = require('fs');
const AWS = require('aws-sdk');
var path = require("path");
var serverModule = require('./server.js')

const s3 = new AWS.S3({
    accessKeyId: require('./config/config.js').ID,
    secretAccessKey: require('./config/config').SECRET
});


var methods = {
    listFiles: async function () {
        
        var files = [];
        const params = {
            Bucket: BUCKET_NAME,
            Delimiter: '',
            Prefix: serverModule.uuid.UUID
        };
        await s3.listObjectsV2( params, (err, data) => {
            if (err) throw err;
            data.Contents.forEach(function (file) {
                //we can change this to only print certain files
                files.push(file);
            });
            //exports.files = files;
            //console.log(files);
            //console.log(serverModule.uuid.UUID);
            
        });
        setTimeout(function () {
            exports.files = files;
            
        }, 2000);
        
    }
};

exports.data = methods;