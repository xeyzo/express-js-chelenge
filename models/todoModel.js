const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
}, {collection: 'tasks'});

module.exports = mongoose.model('todoModel', taskSchema);