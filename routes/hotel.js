import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// comtrollers
import { create } from "../controllers/hotel";
// middleware
import { requireSignin } from "../middlewares";

router.post("/create-hotel", requireSignin, formidable(), create);

module.exports = router;
