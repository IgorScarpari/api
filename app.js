const express = require('express');
const cors = require('cors');

const app = express();
var mongoose = require('mongoose');

const dotenv = require("dotenv").config();
const routes = require("./routes");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static(__dirname + "/uploads"));

// request, response
app.get("/", (req, res) => {
  res.json({ ok: true });
});

// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('connected'))
  .catch(err => console.log(err));

// initialize app routes 
routes(app);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
