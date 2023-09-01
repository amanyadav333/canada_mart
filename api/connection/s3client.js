// const AWS = require("aws-sdk");
// const fs = require('fs');
// const path = require('path');


// // create S3 client 
// const s3Client = new AWS.S3({
//     accessKeyId: 'AKIAZ4MET7EAWWSMNTXB',
//     secretAccessKey: '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',
//     region: 'ap-south-1'
//   });

//   function uploadS3(filePath)  {
//     return new Promise((resolve, reject) => {
      
//     try {
//         // So you need to move the file on $filePath to a temporary place.
//         if (!fs.existsSync('tmp/tmpfile')) {
//           fs.mkdirSync('tmp/tmpfile', { recursive: true })
//         }

//         // Create temp file
//         let tempFilePath = 'tmp/tmpfile/' + path.basename(filePath.originalname);
//         let tempfile = fs.open(tempFilePath, "w", function (err, f) {
//         if (err) {
//           return console.error(err);
//         }
//         console.log(f);
//         fs.writeSync(f, filePath.buffer, 0, filePath.buffer.length, null,  function (err) {
//             if (err)
//               throw 'error writing file: ' + err;
//             fs.close(f, function () {
//               console.log('file written');
//             });
//           });
//           console.log('file opened');
//           let filepng = fs.readFileSync(tempFilePath);

//           const uploadParams = {
//             Bucket: 'uwo-entertainment-media',
//             Key: ''+filePath.originalname,
//             Body: filepng,
//           }
//           s3Client.upload(uploadParams, function (err, data) {
//             if (err) {
//               throw err;
//             }
//             console.log(`File uploaded successfully. ${data.Location}`);
//             resolve(data.Location);
//           })
//         })
//       } catch (error) {
//           console.log(error);
//           reject(error);
//       }
//     });  
//   }

//   module.exports = {
//     uploadS3
// }