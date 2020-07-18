const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    cuisineRating: {
      type: [mongoose.Schema.Types.Mixed],
    },
    serviceRating: {
      type: [mongoose.Schema.Types.Mixed],
    },
    backgroundRating: {
      type: [mongoose.Schema.Types.Mixed],
    },
  },
  {
    versionKey: false,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
