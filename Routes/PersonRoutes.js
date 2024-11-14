const express = require("express");
const router = express.Router();
const Person = require("../models/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const newPersonDataResponse = await newPerson.save();
    console.log("data saved");
    res.status(201).json(newPersonDataResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (["waiter", "manager", "chef"].includes(workType)) {
      const data = await Person.find({ work: workType });
      console.log(`persons of work type ${workType} fetched`);
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(id, data, {
      new: true,
    });
    console.log("person updated");
    res.status(200).json(updatedPerson);
    if (!updatedPerson) {
      res.status(404).json({ error: "Person not exist" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPerson = await Person.findByIdAndDelete(id);
    console.log("person deleted");
    res.status(200).json(deletedPerson);
    if (!deletedPerson) {
      res.status(404).json({ error: "Person not exist" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});



module.exports = router;
