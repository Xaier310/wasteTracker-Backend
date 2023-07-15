const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true
    },
  },
  { timestamps: true }
);
UserSchema.plugin(passportLocalMongoose);
module.exports.User = mongoose.model("User", UserSchema);
module.exports = UserSchema;