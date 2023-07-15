const mongoose = require("mongoose");

const VolSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20
    },
    pinId: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Volunteer", VolSchema);
module.exports.VolSchema = VolSchema;


