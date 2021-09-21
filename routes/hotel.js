import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin, hotelOwner } from "../middlewares";

// comtrollers
import {
  create,
  hotels,
  image,
  sellerHotels,
  remove,
  read,
  update,
  userHotelBookings,
  isAlreadyBooked,
} from "../controllers/hotel";

router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.get("/hotel/image/:hotelId", image);
// get all the hotels posted by the owner
router.get("/seller-hotels", requireSignin, sellerHotels);
// delete hotel route
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, remove);
// single hotel to be displayed (show more button)
router.get("/hotel/:hotelId", read);
// updated hotel listing information
router.put(
  "/update-hotel/:hotelId",
  requireSignin,
  hotelOwner,
  formidable(),
  update
);
// Get all the hotels booked by user (orders)
router.get("/user-hotel-bookings", requireSignin, userHotelBookings);
// Hotel is Already booked
router.get("/is-already-booked/:hotelId", requireSignin, isAlreadyBooked);

module.exports = router;
