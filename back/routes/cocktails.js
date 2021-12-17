const express = require('express');
const Cocktails = require('../models/cocktail');
const multer = require('multer');
const config = require('../config');
const {nanoid} = require('nanoid');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const Cocktails = await Cocktails.find({});
    res.send(Cocktails);
  } catch (e) {
    res.sendStatus(500);
  }
});

const upload = multer({storage});

router.post('/', auth, upload.single('image'), async (req, res) => {
  const body = {
    author: req.body.author,
    title: req.body.title,
    recipe: req.body.recipe,
    published: req.body.published,
    ingredients: req.body.ingredients,
    rating: req.body.rating,
  };

  if (req.file) {
    body.image = 'uploads/' + req.file.filename;
  }

  const cocktails = new Cocktails(body);

  try {
    await cocktails.save();
    res.send(cocktails);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

module.exports = router;