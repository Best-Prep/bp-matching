const mongoose = require('mongoose');

const RegisteringClass = mongoose.model('RegisteringClasses', new mongoose.Schema({
    "id": String, //Master Id
    "school": {
        "_id": false,
        "id": String, //Reference to School Master Id
        "name": String
    },
    "teacher": {
        "_id": false,
        "firstName": String,
        "lastName": String
    },
    "students": [{
        "id": String, //Master Id
        "firstName": String,
        "lastName": String,
        "preferredSubjects": [{
            "id": String, //Reference to Subject Master Id in CareerDay
            "name": String
        }]
    }]
}));
module.exports = RegisteringClass;