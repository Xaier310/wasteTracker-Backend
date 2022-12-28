const router = require("express").Router();
const Volunteer = require("../models/Volunteer");
const Pin = require("../models/Pin");
const { VolSchema } = require("../models/Volunteer");
const mongoose = require("mongoose");
const userSchema = require("../models/User");
let User = mongoose.model("User", userSchema);

//create a volunteer
router.post("/:currentPlaceId", async (req, res) => {
  try {
    // console.log(req.body);
    let allCheckInVol = await Volunteer.findOne({
      $and: [{ pinId: req.body.pin_id }, { username: req.body.username }],
    });
    if (allCheckInVol) {
      await Volunteer.deleteOne({
        $and: [{ pinId: req.body.pin_id }, { username: req.body.username }],
      });
      res.status(200).json("You are not volunteer now");
      console.log("You are not volunteer now");
    } else {
      let user = await User.findOne({ username: req.body.username });
      const newVol = new Volunteer({
        username: req.body.username,
        pinId: req.body.pin_id,
        email: user?.email,
      });
      newVol.save((err, results)=>{
            if(err){
              res.status(500).json(err);
              console.log(err);
            }else{
              res.status(200).json("Volunteer added successfully");
              console.log("Volunteer added successfully");
            }
          });
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get all volunteers
router.get("/:currentPlaceId", async (req, res) => {
  try {
    const pins = await Volunteer.find({ pinId: req.params.currentPlaceId });
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const pins = await Volunteer.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:currentPlaceId",(req,res)=>{
  Volunteer.deleteMany({pinId: req.params.currentPlaceId},(err,result)=>{
    if(err){
      res.status(500).json(err);
    }else{
      res.status(200).json("Deleted voluteers of this location");
    }
  });
});

module.exports = router;
