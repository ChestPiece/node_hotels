const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my hotel");
});

const personRoutes = require("./Routes/PersonRoutes");
const menuRoutes = require("./Routes/MenuItemRoutes");

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
