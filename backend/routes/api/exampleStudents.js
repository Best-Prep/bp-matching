const express = require("express");
const router = express.Router();

router.get('/getStudent', function(req, res) {
    // res.send('respond with a resource');
    res.json({studentName: "John Doe"})
});

   
module.exports = router;
