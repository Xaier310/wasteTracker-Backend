const mongoose = require("mongoose");
const { Volunteer } = require("./Volunteer");
const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
      max: 60,
    },
    desc: {
      type: String,
      required: true,
      min: 3,
    },
    volunteers: {
      type: Number,
    },
    img: {
      url:{
        type: String,
        required: true,
      },
      public_id:{
        type: String,
        required: true,
      }
    },
    long: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Pin || mongoose.model("Pin", PinSchema);
