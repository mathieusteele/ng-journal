const express = require("express");
const router = express.Router();
const Entry = require("../models/entry");

router.get("/", (req, res, next) => {
  Entry.find()
    .then((entries) => {
      res.status(200).json({
        message: "Entries fetched successfully!",
        entries: entries,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {

  const entry = new Entry({
    title: req.body.title,
    content: req.body.content,
  });

  entry
    .save()
    .then((createdEntry) => {
      res.status(201).json({
        message: "Entry added successfully",
        entry: createdEntry,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Entry.findOne({ id: req.params.id })
    .then((entry) => {
      entry.title = req.body.title;
      entry.content = req.body.content;

      Entry.updateOne({ id: req.params.id }, entry)
        .then((result) => {
          res.status(204).json({
            message: "Entry updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Entry not found.",
        error: { entry: "Entry not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Entry.findOne({ id: req.params.id })
    .then((entry) => {
      Entry.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Entry deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Entry not found.",
        error: { entry: "Entry not found" },
      });
    });
});

module.exports = router;