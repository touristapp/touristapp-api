const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

aws.config.update({
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  region: process.env.AWS_S3_REGION
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

const upload = multer({
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
},
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

const deleteImg = async (imgKey) => {
  await s3
  .headObject({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: imgKey
  })
  .promise()
  .then(
    () =>     s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: imgKey
  },function (err,data){}),
    err => {
      if (err.code === 'NotFound') {
        return false;
      }
      throw err;
    }
  )
    s3.deleteObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: imgKey
    },function (err,data){})
}


// const exists = await s3
//   .headObject({
//     Bucket: S3_BUCKET_NAME,
//     Key: s3Key,
//   })
//   .promise()
//   .then(
//     () => true,
//     err => {
//       if (err.code === 'NotFound') {
//         return false;
//       }
//       throw err;
//     }
//   );

module.exports = { upload, deleteImg };
