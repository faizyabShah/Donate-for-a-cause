require("dotenv").config();

const express = require("express");
//const sampleRoute = require("./routes/sampleRoute");
const userRoute = require("./routes/userRoute");
const orgRoute = require("./routes/orgRoute");
const projRoute = require("./routes/projRoute");
const cors = require("cors");

const mongoose = require("mongoose");

//express app
const app = express();

//middleware

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
  })
);
//localhost:5000/api/user/clearnotificatios
app.use("/api/user", userRoute);
app.use("/api/organization", orgRoute);
app.use("/api/projects", projRoute);

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
