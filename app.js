/*
Name: Teniel Smith-Edwards
ID: 101249879
Course: COMP3133 - Full Stack Development II
CRN: 58084
Purpose: Assignment 1 - Create an employee managment system with Express, GraphQL, and Mongoose (Backend).
Date of Completion: February 16, 2025
*/

// import required modules/models
const express = require('express')
const mongoose = require('mongoose')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const UserModel = require('./model/User')
const EmployeeModel = require('./model/Employee')
const User = require('./model/User')
const Employee = require('./model/Employee')

// define axpress server and declare port
const app = express()
const PORT = 4000

// GQL Schema
const schema = buildSchema(
    `type User{
        username: String
        email: String
        password: String!
    }

    type Employee{
        eid: ID
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
    }

    type Query{
        login(username: String, email: String, password: String!): User
        employees: [Employee]
        findEmployeeByID(eid: ID!): Employee
        findEmployees(designation: String, department: String): [Employee]
    }
    
    type Mutation{
        signup(
            username: String!
            email: String
            password: String!
        ): User
        
        addEmployee(
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            designation: String!
            salary: Float!
            date_of_joining: String!
            department: String!
            employee_photo: String
        ): Employee

        updateEmployee(
            eid: ID!
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            designation: String!
            salary: Float!
            date_of_joining: String!
            department: String!
            employee_photo: String
        ): Employee

        deleteEmployee(eid: ID!): Employee
    }
    `
)

// root resolver
const resolver = {
    Query: {
        login: async (_, { username, email, password }) => {
            return await User.findOne({ $or: [username, email], password })
        },
        employees: async(parent, args, contextValue, info) => {
            return await Employee.find()
        },
        findEmployeeByID: async (_, { eid }) => {
            return await Movie.findById(eid)
        },
        findEmployees: async (_, { designation, department }) => {
            return await Employee.find({ $or: [ designation, department ]})
        }
    },
    Mutation: {
        signup: async (_, args) => {
            const newUser = new User({
                username: args.username,
                email: args.email,
                password: args.password
            })

            const user = await newUser.save()
            return user
        },
        addEmployee: async (_, args) => {
            const newEmployee = new Employee({
                first_name: args.first_name,
                last_name: args.last_name,
                email: args.email,
                gender: args.gender,
                designation: args.designation,
                salary: args.salary,
                date_of_joining: args.date_of_joining,
                department: args.department,
                employee_photo: args.employee_photo
            })

            const employee = await newEmployee.save()
            return employee
        },
        updateEmployee: async (_, { eid, first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
            const employee = await Employee.findById(eid);
            if (!employee) return null;

            if (first_name) employee.first_name = first_name;
            if (last_name) employee.last_name = last_name;
            if (email) employee.email = email;
            if (gender) employee.gender = gender;
            if (designation) employee.designation = designation;
            if (salary) employee.salary = salary;
            if (date_of_joining) employee.date_of_joining = date_of_joining;
            if (department) employee.department = department;
            if (employee_photo) employee.employee_photo = employee_photo;

            return await employee.save();
        },
        deleteEmployee: async (_, { eid }) => {
            const employee = await Movie.findById(eid);
            if (!employee) return null;

            await employee.remove();
            return employee; 
        }
    }
}

// GqlHttp
const GqlHttp = graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
})

app.use("/graphql", GqlHttp)

// connect to MongoDB
const dB = async() => {
    try{
        console.log(`Attempting to connect to DB`);
        
        const DB_NAME = "comp3133_101249879_assignment1"
        const DB_USER_NAME = "admin"
        const DB_PASSWORD = 'S3creTR0ot'
        const CLUSTER_ID = 'nskbe'
        const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@comp3123.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=COMP3123`

        mongoose.connect(DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then( () => {
            console.log(`MongoDB connected`)
        }).catch( (err) => {
            console.log(`Error while connecting to MongoDB : ${JSON.stringify(err)}`)
        });
    }catch(error){
        console.log(`Unable to connect to DB : ${error.message}`);
    }
}

app.listen(PORT, () => {
    console.log('Server started')
    dB()
    console.log('http://localhost:4000/graphql')
})