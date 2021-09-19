import Hotel from "../models/hotel";
// file system --> comes with node.js
import fs from "fs";

export const create = async (req, res) => {
  //   console.log("hotel create"); --> Test End point

  // Check data to be saved in DB
  //   console.log("req.fields", req.fields);
  //   console.log("req.files", req.files);

  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;
    // handle image (synchronously)
    // the name of image depends on what was written in the FE (NewHotel.js), must be the same here
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }
    hotel.save((err, result) => {
      if (err) {
        console.log("saving hotel err => ", err);
        res.status(400).send("Error saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

// To retrieve data from DB and post in Home Page
export const hotels = async (req, res) => {
  let all = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  // console.log(all);
  res.json(all);
};

// To display hotel image
export const image = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

// To display all hotels posted by owner
export const sellerHotels = async (req, res) => {
  let all = await Hotel.find({ postedBy: req.user._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.send(all);
};

// delete hotel
export const remove = async (req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select("-image.data")
    .exec();
  res.json(removed);
};

// display single hotel (show more button)
export const read = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId)
    .select("-image.data")
    .exec();
  console.log("SINGLE HOTEL", hotel);
  res.json(hotel);
};
