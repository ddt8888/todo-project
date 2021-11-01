const mongoose = require('mongoose')

const todo = require('./todo.js')

const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, default: 0 },
    email: { type: String, required: true, trim: true },
    todos: [todo]
})

const users = mongoose.model('users', userSchema)
module.exports = users;