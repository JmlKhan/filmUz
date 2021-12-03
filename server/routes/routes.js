const express = require('express');
const router = express.Router();
const multer = require('multer');

const api = require('../controllers/api');

//multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, './uploads');
  },
  filename: function (req, file, cd) {
    // eslint-disable-next-line prefer-template
    cd(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single('image');

router.get('/', api.getAllPosts);
router.get('/:id', api.getPost);
router.post('/', upload, api.createPost);
router.patch('/:id', api.updatePost);
router.delete('/:id', api.deletePost);

module.exports = router;