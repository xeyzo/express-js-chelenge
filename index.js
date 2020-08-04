const express = require("express")
const mongoose = require("mongoose")
const db = require('./config/db')
const todoModel = require('./models/todoModel')
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const error = (error, result) => {
    console.log(error, result);
}

const getTodo = async () => {
    return await todoModel.find({});
}


app.get('/', async (req, res) => {
    const todoList = await getTodo()
        .then((response) => {
            console.log(response);
            res.render('todo', {
                todo: response
            });
        })
        .catch((err) => console.log(err));
    console.log({
        todoList
    });
})

app.post('/', async (req, res) => {
    const addTodo = todoModel({
        name: req.body.name,
        description: req.body.description
    })
    await addTodo.save(error)
    console.log(addTodo);
    res.redirect('/')
})

//router.post('/',
//  [
//    check('name')
//      .isLength({ min: 1 })
//      .withMessage('Please enter a name'),
//    check('description')
//      .isLength({ min: 1 })
//      .withMessage('Please enter an email'),
//  ],
//  (req, res) => {
//    const errors = validationResult(req);

//    if (errors.isEmpty()) {
//      res.send('succes');
//    } else {
//      res.render('todo', {
//        title: 'Registration form',
//        errors: errors.array(),
//        data: req.body,.
//  });



app.get("/:id?/del", async (req, res) => {
    await todoModel.deleteOne({
        _id: req.params.id
    }, error)
    res.redirect("/");
});

app.get("/:id?/done", async (req, res) => {
    await todoModel.updateOne({
        _id: req.params.id
    }, {
        status: true
    }, error)
    res.redirect("/");
});

app.get("/:id?/undone", async (req, res) => {
    await todoModel.updateOne({
        _id: req.params.id
    }, {
        status: false
    }, error)
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})