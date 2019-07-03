const express = require("express");
const router = express.Router();

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
// spreadsheet key is the long id in the sheets URL


var doc = new GoogleSpreadsheet('1xsMcELNalreYU9c1nrtSiHczYycUxa3Tl8VUcNVP6dI');
var sheet;

//Sets the ID of the spreadsheet we are accessing, called when the user submits the link.
router.post('/importSheet', async function(req, res) {
    var str = req.body.sheetLink; //This gets the sheetLink from the request object
    
    /*This matches the 16 characters in between the back slashes ('/'), 
    thus grabbing the sheet ID required to connect to the sheet*/
    var result = str.match(/([^\/]+){16}/)[0]; 
    res.json({id: result});
    console.log(result)
});

module.exports = router;