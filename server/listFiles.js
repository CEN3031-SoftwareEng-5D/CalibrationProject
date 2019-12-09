const BUCKET_NAME = 'calfilesx';
const fs = require('fs');
const AWS = require('aws-sdk');
var path = require("path");
var serverModule = require('./server.js')

const s3 = new AWS.S3({
    accessKeyId: require('./config/uploadConfig.js').ID,
    secretAccessKey: require('./config/uploadConfig.js').SECRET
});
var data = {
  listFiles: async function () {
      var files = [];
      const params = {
          Bucket: BUCKET_NAME,
          Delimiter: '',
          Prefix: serverModule.uuid.UUID
      };
      await s3.listObjectsV2( params, (err, data) => {
          if (err) throw err;
          files = data.Contents.map(file => file);
      });
      setTimeout(function () {
          console.log(files);
          exports.files = files;

      }, 1000);
    }
};

exports.data = data;
