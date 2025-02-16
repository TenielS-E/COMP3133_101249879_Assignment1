// import required library
const mongoose = require('mongoose')

// create user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
})


// export user schema
module.exports = mongoose.model("user", userSchema)