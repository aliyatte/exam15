const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Place = require('../models/Place');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const places = await Place.find().sort({createdAt: -1}).limit(50).populate('createdBy');
    return res.send(places);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).send({message: 'Not found'});
    }

    return res.send(place);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    req.body.user = req.user._id;
    const place = new Place(req.body);

    await place.save();
    return res.send({id: place._id});

  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).send({message: 'Not found'});
    }

    if (req.body.images) {
      place.images = req.body.images;
    }

    if (req.body.reviews) {
      place.reviews = req.body.reviews;
    }

    await Place.updateOne({_id: req.params.id}, place);
    return res.send({message: place._id + ' successfully changed'});
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.delete("/:id", [auth, permit('admin')], async (req, res) => {
  try {
    await Place.findOneAndRemove({_id: req.params.id});
    return res.send({ message: `${req.params.id} removed` });
  } catch (e) {
    return res.status(422).send(e);
  }
});


module.exports = router;