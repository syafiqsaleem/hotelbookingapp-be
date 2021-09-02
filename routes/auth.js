import express from "express";

const router = express.Router();

// comtrollers
import { showMessage, register } from "../controllers/auth";

router.get("/:message", showMessage);
router.post("/register", register);

// TypeEror: Router.use() requires a middleware function but got a Object
// Wrong way of importing and exporting
// Since we are using require in the autoloading routes, we cannot use export default
module.exports = router;
