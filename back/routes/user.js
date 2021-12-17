const axios = require("axios").create();

const config = require("../config");
const {nanoid} = require("nanoid");
const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.post('/facebookLogin', async (req, res) => {
  const inputToken = req.body.accessToken;
  const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

  const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

  try {
    const response = await axios.get(debugTokenUrl);
    if (response.data.data.error) {
      return res.status(401).send({message: 'Facebook token incorrect'});
    }

    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({message: 'Wrong user ID'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if (!user) {
      user = new User({
        // username: req.body.name,
        // password: nanoid(),
        // facebookId: response.data.data.user_id,
        email: req.body.email || nanoid(),
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name
      });
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({message: 'Login or register successful', user});
  } catch (error) {
    console.log(error);
    return res.status(401).send({message: 'Facebook token incorrect'});
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(401).send({message: 'Credentials are wrong!'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(401).send({message: 'Credentials are wrong!'});
  }

  user.generateToken();
  await user.save({validateBeforeSave: false});

  res.send({message: 'Username and password correct!', user});
});

router.delete('/sessions', async (req, res) => {
  const token = req.get('Authorization');
  const success = {message: 'Success'};

  if (!token) return res.send(success);

  const user = await User.findOne({token});

  if (!user) return res.send(success);

  user.generateToken();

  await user.save({validateBeforeSave: false});

  return res.send(success);
});

module.exports = router;
