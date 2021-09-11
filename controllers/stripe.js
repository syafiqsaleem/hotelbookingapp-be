// export const createConnectAccount = async (req, res) => {
//   console.log("REQ USER FROM REQUIRE_SIGNIN MIDDLEWARE", req.user);
//   console.log("YOU HIT CREATE CONNECT ACCOUNT ENDPOINT");
// };

import User from "../models/user";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  // 1) find user from db
  const user = await User.findById(req.user._id).exec();
  console.log("USER ===> ", user);
  // 2) if user do not have stripe_account_id yet, create now
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });
    console.log("ACCOUNT ===> ", account);
    user.stripe_account_id = account.id;
    user.save();
  }
  // 3) create account link based on account id (for frontend to complete onboarding)
  // 4) update payment schedule (optional. default is 2 days)
};
