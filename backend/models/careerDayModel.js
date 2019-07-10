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
    }]
}))

module.exports = CareerDay;