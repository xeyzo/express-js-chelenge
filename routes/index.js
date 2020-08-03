const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Todo = mongoose.model('Todo');

async()=>{
  if (errors.isEmpty()) {
    const todo = new Todo(req.body);
    registration.save()
      .then(() => { res.send('Thank you for your registration!'); })
      .catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
      });
  } else {
    console.log(todo)
  }
}

router.get('/', (req, res) => {
    res.render('form', { title: 'Todo list app' });
  });

router.post('/',(req, res) => {
    console.log(req.body);
    res.render('form', { title: 'Todo list app' });
  });

  router.get('/list', (req, res) => {
    Todo.find()
      .then((list) => {
        res.render('index', { title: 'Listing registrations', registrations });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
  });

module.exports = router;