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
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

// pre middleware to update date information was updated and make sure date created is present
userSchema.pre('save', (next) => {
    console.log("Before employee saved")
    let now = Date.now()
    this.updated_at = now

    if (!this.created_at) {
        this.created_at = now
    }
    next()
});

userSchema.pre('findOneAndUpdate', (next) => {
    console.log("Before findOneAndUpdate")
    let now = Date.now()
    this.updated_at = now
    console.log(this.updated_at)
    next()
  });

// export user schema
module.exports = mongoose.model("user", userSchema)