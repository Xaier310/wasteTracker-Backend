const router = require("express").Router();
const { request } = require("express");
const Pin = require("../models/Pin");

//create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});


//delete pin
router.delete("/:pin_id", async (req, res) => {
  try {
    // console.log("request made = ",req.params.pin_id);
    Pin.findByIdAndDelete(req.params.pin_id,(err,results)=>{
      if(err){
        res.status(500).json(err);
      }else{
        res.status(200).json("Deleted successfully");
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
