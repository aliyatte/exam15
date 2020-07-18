const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PhotoSchema = new Schema(
  {
    image: {
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
  },
  {
    versionKey: false,
  }
);

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
