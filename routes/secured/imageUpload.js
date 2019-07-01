import { Router } from 'express';

const upload = require('../../services/imageUpload');

const singleUpload = upload.single('image');

const api = Router();

api.post('/', (req, res) => {
    singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }

    return res.json({'imageUrl': req.file.location});
  });
});

export default api;