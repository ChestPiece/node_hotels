const express = require('express');
const routes = express.Router();
const MenuItem = require("../models/menuItem");

routes.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);

    const newMenuItemResponse = await newMenuItem.save();
    console.log("menu item saved");
    res.status(201).json(newMenuItemResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

routes.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("menu items fetched");
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

routes.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (["sweet", "spicy", "sour"].includes(taste)) {
      const data = await MenuItem.find({ taste: taste });
      console.log(`menu items of taste ${taste} fetched`);
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

routes.patch("/:id", async (req, res) => {S
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not exist" });
    }
    console.log("menu item updated");
    res.status(200).json(updatedMenuItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ error: "Menu item not exist" });
    }
    console.log("menu item deleted");
    res.status(200).json(deletedMenuItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = routes;
