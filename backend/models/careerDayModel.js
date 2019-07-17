const mongoose = require('mongoose');

const CareerDay = mongoose.model('CareerDays', new mongoose.Schema({
    "id": String,
    "date": Date,
    "schools": [{
        "id": String, //Reference to School Master Id
        "name": String
    }],
    "subjects": [{
        "id": String, //Master Id
        "name": String
    }],
    "sessions": [{
        "id": String,
        "name": String,
        "seats": Number,
        "period": Number,
        "assignedStudents": [{
            "id": String, //Reference to Student Master Id from classroom
            "firstName": String,
            "lastName": String
        }]
    }]
}))

module.exports = CareerDay;