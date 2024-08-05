import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { processpayments, sendStripeApiKey } from "../controllers/payment.controller.js";

const router = Router();

router.route("/process").post(isLoggedIn,processpayments)
router.route("/stripeapikey").get(isLoggedIn,sendStripeApiKey)

export default router