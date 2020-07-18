const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const Review = require('../models/Review');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).send({message: "Отзыв не найден"});
    }

    return res.send(review);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const reviewData = {
      postedBy: req.user._id,
      comment: req.body.comment,
    };

    if (req.body.cuisineRating) {
      reviewData.cuisineRating = req.body.cuisineRating;
    }

    if (req.body.serviceRating) {
      reviewData.serviceRating = req.body.serviceRating;
    }

    if (req.body.backgroundRating) {
      reviewData.backgroundRating = req.body.backgroundRating;
    }

    const review = new Review(reviewData);

    await review.save();
    return res.send(review);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.delete('/:id', [auth, permit('super_admin')], async (req, res) => {
  try {
    await Review.findOneAndDelete({_id: req.params.id});
    return res.send({message: `Отзыв ${req.params.id} удален`});
  } catch (error) {
    return res.status(400).send({message: "Не удалось удалить отзыв"});
  }
});

module.exports = router;