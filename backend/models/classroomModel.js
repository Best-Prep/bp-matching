const mongoose = require('mongoose');

const RegisteringClass = mongoose.model('RegisteringClasses', new mongoose.Schema({
    "id": String, //Master Id
    "careerDayId": String,
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
        }],
        "schedule": [{ //Index of session represents the period
            "id": String, //Reference to Session Master Id
            "name": String //Name of the subject
        }]
    }]
}));
module.exports = RegisteringClass;