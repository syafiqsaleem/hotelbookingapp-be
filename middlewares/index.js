import expressJwt from "express-jwt";
import Hotel from "../models/hotel";

// req.user
export const requireSignin = expressJwt({
  // secret, expiryDate
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // Use to verify token
});

// check if the hotel posted belongs to the owner whom posted the listing
// hotelId, naming convention must the same as in the hotel route parameter
export const hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  let owner = hotel.postedBy._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};
