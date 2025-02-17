// import required library
const mongoose = require('mongoose')

// create employee schema
const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    gender: { // male/female/other
        type: String,
        validate: {
             validator: function(val) {
                if (val == "Male" || val == "Female" || val == "Other") {
                    return true;
                } 
                return false;
             },
             message: "The employees gender is Male, Female, or Other."
        },
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    salary: { // >=1000
        type: Number,
        required: true,
        validate: {
            validator: function(val) {
               return val >= 1000
            },
            message: "The employees salary must be greater than 1000."
       }
    },
    date_of_joining: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    employee_photo: {
        type: String
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
employeeSchema.pre('save', (next) => {
    console.log("Before employee saved")
    let now = Date.now()
    this.updated_at = now

    if (!this.created_at) {
        this.created_at = now
    }
    next()
});

employeeSchema.pre('findOneAndUpdate', (next) => {
    console.log("Before findOneAndUpdate")
    let now = Date.now()
    this.updated_at = now
    console.log(this.updated_at)
    next()
  });

// export employee schema
module.exports = mongoose.model("Employee", employeeSchema)