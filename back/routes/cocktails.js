const express = require('express');
const Cocktail = require('../models/cocktail');
const multer = require('multer');
const config = require('../config');
const {nanoid} = require('nanoid');
const path = require('path');
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
    const Cocktails = await Cocktail.find({});
    res.send(Cocktails);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

const upload = multer({storage});

router.post('/', auth, upload.single('image'), async (req, res) => {
  console.log(req.body);
  const body = {
    author: req.body.author,
    title: req.body.title,
    recipe: req.body.recipe,
    published: req.body.published,
    ingredients: JSON.parse(req.body.ingredients),
    rating: req.body.rating,
  };

  if (req.file) {
    body.image = 'uploads/' + req.file.filename;
  }

  console.log(body)

  const cocktails = new Cocktail(body);

  try {
    await cocktails.save();
    res.send(cocktails);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

module.exports = router;