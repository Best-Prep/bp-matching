const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    testProperty: String,
    dateCreated: Date,
})

const Test = mongoose.model('Test', TestSchema)

module.exports = Test;