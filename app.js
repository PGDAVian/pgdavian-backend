const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//router
const postRoutes = require('./controllers/routes');



app.use(bodyParser.json());
app.use(cors());
app.use('/', postRoutes);




module.exports = app;
