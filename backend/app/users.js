const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const createRouter = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const users = await User.find();

    if (users) {
      res.send(users);
    }
  });

  router.post('/', (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
      res.status(400).send({_message: 'Пароли не совпадают'})
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    })

    user.save()
      .then(user => res.send(user))
      .catch(error => res.status(400).send(error))
  });

  router.delete('/delete-user/:id', [auth, permit('admin')], async (req, res) => {
    const user = await User.findOne({_id: req.params.id});

    user.remove()
      .then(() => res.send({message: 'Пользователь был удалён'}))
      .catch(error => res.status(400).send(error))
  });

  router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) return res.status(400).send({error: 'Username not found'});

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) return res.status(400).send({error: 'Password is wrong'});

    res.send({message: 'Username and password correct'})
  })


  return router;
}

module.exports = createRouter;