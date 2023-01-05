const router = require("express").Router();
const { request } = require("express");
const Pin = require("../models/Pin");
const axios = require("axios");

//create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json("An unknown error occurred");
  }
});

//get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json("An unknown error occurred");
  }
});

//single pin data
router.get("/pindata/:pin_id", async (req, res) => {
  try {
    const pin = await Pin.findOne({_id:req.params.pin_id});
    res.status(200).json(pin);
  } catch (err) {
    res.status(500).json("An unknown error occurred");
  }
});


//delete pin
router.delete("/:pin_id", async (req, res) => {
  try {
    Pin.findByIdAndDelete(req.params.pin_id,(err,results)=>{
      if(err){
        res.status(500).json("An unknown error occurred");
      }else{
        res.status(200).json("Deleted successfully");
      }
    });
  } catch (err) {
    res.status(500).json("An unknown error occurred");
  }
});

module.exports = router;
