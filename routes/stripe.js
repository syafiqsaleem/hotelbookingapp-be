import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// comtrollers
import {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
} from "../controllers/stripe";

router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.post("/get-account-balance", requireSignin, getAccountBalance);

module.exports = router;
