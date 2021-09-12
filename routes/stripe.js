import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// comtrollers
import { createConnectAccount, getAccountStatus } from "../controllers/stripe";

router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status", requireSignin, getAccountStatus);
module.exports = router;
