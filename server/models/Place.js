const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    images: [{
      type: Schema.Types.ObjectId,
      ref: 'Photo',
    }],
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review',
    }],
    overallRating: {
      type: [mongoose.Schema.Types.Mixed],
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

const Place = mongoose.model("Place", PlaceSchema);

module.exports = Place;
