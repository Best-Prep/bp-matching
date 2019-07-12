const mongoose = require('mongoose');

const School = mongoose.model('Schools', new mongoose.Schema({
    "id": String, //Master Id
    "name": String,
    "sessions": [{
        "careerDayId": String, //Reference to Career day master Id
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

module.exports = School;