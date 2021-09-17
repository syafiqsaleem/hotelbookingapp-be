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
