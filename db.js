const mongoose = require("mongoose");

//mongoose URL

const mongoURL = "mongodb://localhost:27017/hotels";

//setUp MongoDB connection

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to mongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB error", err);
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
