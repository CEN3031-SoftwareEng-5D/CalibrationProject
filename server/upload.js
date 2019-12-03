const IncomingForm = require("formidable").IncomingForm;
const fs = require('fs');
const AWS = require('aws-sdk');
var path = require("path");
var serverModule = require('./server.js')
const BUCKET_NAME = 'calfilesx';
var isDeleted = false;


const s3 = new AWS.S3({
    accessKeyId: require('./config/config.js').ID,
    secretAccessKey: require('./config/config').SECRET
});

const uploadFile = (file, uuid) => {
    // Read content from the file
    const fileContent = fs.readFileSync(file.path);

    // Setting up S3 upload parameters
    var name = uuid+"/"+file.name;
    const params = {
        Bucket: BUCKET_NAME,
        Key: name, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

const populateFiles = (files)=>{
  const params={
    Bucket: BUCKET_NAME,
    Delimiter: '',
    Prefix: ''
  }
  s3.listObjectsV2(params, (err,data)=>{
    if(err) throw err;
   data.Contents.forEach(function(file){
     //we can change this to only print certain files
     files.push(file);
     //console.log(file);

   })
   //console.log(files);
 })

}

const deleteAllFiles = ()=>{

  const params={
    Bucket: BUCKET_NAME,
    Delimiter: '',
    Prefix: '',
  }
  s3.listObjectsV2(params, (err,data)=>{
    if(err) throw err;
   data.Contents.forEach(function(file){

     deleteFile(file);
   })

 })
}

const deleteFile = (file) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
    };

    // deleting files to the bucket
    s3.deleteObject(params, function(err, data) {
      if (err)
        console.log(err, err.stack);  // error
      else
        console.log("File Deleted "+file.name);  // deleted
    });
};


// var getObject = function(file) {
//   var name = serverModule.uuid.UUID +"/"+file.name;
//   return new Promise(function(success, reject) {
//       s3.getObject(
//             { Bucket: BUCKET_NAME, Key: name },
//           function (error, data) {
//               if(error) {
//                   reject(error);
//               } else {
//                   success(data);
//                   console.log(data);
//               }
//           }
//       );
//   });
// }
let download = file => {
  var name = serverModule.uuid.UUID +"/"+file.name;
  s3.getObject({ Bucket: BUCKET_NAME, Key: name }, (err, data) => {
      var fileInfo = data.Body;
      console.log(fileInfo);
    })
}

module.exports = function upload(req, res) {

  var fileContent = [];
  var form = new IncomingForm()
  if(!isDeleted){
    //deleteAllFiles();
    isDeleted = true;
  }
  form.on('file', (field, file) => {
    var uuid = serverModule.uuid.UUID;
    console.log(uuid);
    uploadFile(file, uuid);
    //deleteFile(file);
    //download(file);

    const url = s3.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Key: uuid + '/' + file.name,
        Expires: 300,
    })
    console.log(url);
  })

  form.on('end', () => {
    res.json()
  })
  form.parse(req)
}
