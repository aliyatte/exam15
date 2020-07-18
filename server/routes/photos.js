const express = require("express");
const ValidationError = require("mongoose").Error.ValidationError;

const auth = require("../middleware/auth");
const permit = require('../middleware/permit');
const upload = require("../multer").uploads;

const Photo = require("../models/Photo");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const photos  = await Photo.find().populate('createdBy');
    return res.send(photos);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).send({message: "Not found"});
    }
    return res.send(photo);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    req.body.user = req.user._id;

    const photo = new Photo(req.body);

    if (req.file) {
      photo.image = req.file.filename;
    }

    await photo.save();
    return res.send({id: photo._id});
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      console.log(e);
      return res.sendStatus(500);
    }
  }
});

router.delete("/:id", [auth, permit('admin')], async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Photo.findByIdAndDelete(id);
    return res.send(result);
  } catch (error) {
    return res.send({error});
  }
});

module.exports = router;