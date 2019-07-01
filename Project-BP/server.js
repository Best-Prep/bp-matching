require('dotenv').config()
require('./backend/config/db-conn');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const testDocuments = require("./backend/routes/api/testRoute");
const spreadsheets = require("./backend/routes/api/spreadsheets");


app.use(cors());
app.use(bodyParser.json());

app.use("/api/testDocument", testDocuments);
app.use("/api/spreadsheets", spreadsheets)

// gives server static files generated by npm build in client
app.use(express.static('./client/build'));
//Allows for client side routing, but also serves static files, kinda
app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/client/build/' });
});
  
const PORT = process.env.PORT;
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});