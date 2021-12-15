const express = require('express');
const Cocktails = require('../models/cocktail');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const Events = await Cocktails.find({author: req.user.username}).sort({date: 1});
    res.send(Events);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, async (req, res) => {
  const body = {
    title: req.body.title,
    text: req.body.text,
    date: req.body.date,
    duration: req.body.duration,
    author: req.body.author,
  };

  if (req.share) {
    body.share = req.body.share;
  }

  const events = new Cocktails(body);

  try {
    await events.save();
    res.send(events);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

module.exports = router;