const userSchema = require("../models/User");
const router = require("express").Router();
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");

userSchema.plugin(passportLocalMongoose);
let User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());

//REGISTER
router.post("/register", async (req, res) => {
  
  try{
    const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          // password: req.body.password,
        });

  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      // res.redirect("/register");
      res.status(500).json(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        // res.redirect("/home");
        res.status(200).json(user._id);
      });
    }
  });
  }
  
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username or password");

    //validate password
    req.login(user,async (err) => {
      if (err){
        console.log(err);
        // res.redirect("/login");
        res.status(500).json(err);
      }
else{
  passport.authenticate("local")(req, res, () => {
    // res.redirect("/home");
    res.status(200).json({ _id: user._id, username: user.username });
  });
}
});
}

  catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
try {
  req.logout();
  res.status(200).json("You are logged out");
}

  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;