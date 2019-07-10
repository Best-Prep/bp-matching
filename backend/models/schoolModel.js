const mongoose = require('mongoose');

const School = mongoose.model('Schools', new mongoose.Schema({
    "id": String, //Master Id
    "name": String,
    "sessions": [{
        "careerDayId": String, //Reference to Career day master Id
        "name": String,
        "period": Number,
        "assignedStudents": [{
            "student_id": String, //Reference to Student Master Id from classroom
            "student_first_name": String,
            "student_last_name": String
        }]
    }]
}))

module.exports = School;