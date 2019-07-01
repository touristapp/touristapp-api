import { Router } from 'express';

const { uploadImg, deleteImg } = require('../../services/handleS3');

const singleUpload = uploadImg.single('image');

const api = Router();

api.post('/', (req, res) => {
    singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }

    return res.json({'imageUrl': req.file.location});
  });
});

api.delete('/delete/:fileKey', (req, res) => {
  try {
    deleteImg(req.params.fileKey);
    return res.status(200).json({message: "Success - Image deleted from S3 or not existing"})
  }
  catch (err) {
    return res.status(500).json({ message: "error", error: err.stack});
  }
})

export default api;