require("dotenv").config();

const express = require("express");
//const sampleRoute = require("./routes/sampleRoute");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");

//express app
const app = express();

//middleware
app.use(express.json());
//app.use("/api/sample", sampleRoute);
app.use("/api/user", userRoute);

//connect to DB and listen for requests
const port = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening for requests on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
