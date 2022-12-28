const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const pinRoute = require("./routes/pins");
var bodyParser = require('body-parser');
const userRoute = require("./routes/users");
const volRoute = require("./routes/volunteer");
const userSchema = require("./models/User");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const path = require("path");
const deleteImageRoute = require("./routes/deleteFile"); 
var cors = require("cors");

app.use(cors());

app.use(express.json());

//setup passport
app.use(
  session({
    secret: "wasteTracker's_secretKey",
    resave: false,
    saveUnintialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  `${process.env.MONGO_SERVER}`,
  // `mongodb://localhost:27017/WasteTracker`,
  (err) => {
    if (err) throw err;
    console.log("DB Connected Successfully");
  }
);

//after schemas
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

//after creating collection
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);
app.use("/api/volunteer", volRoute);
app.use("/deleteImage", deleteImageRoute);

const PORT = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.send(`Backend running fine on port ${PORT}`);
});
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
