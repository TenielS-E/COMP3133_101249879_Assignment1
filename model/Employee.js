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
        }
    },
    designation: {
        type: String,
        required: true
    },
    salary: { // >=1000
        type: Float64Array,
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
        type: Date
    },
    updated_at: {
        type: Date
    }
})

// export employee schema
module.exports = mongoose.model("employee", employeeSchema)