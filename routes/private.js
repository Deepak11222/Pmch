const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/private");
// const { protect } = require("../middleware/auth");
const { protect, protectStoreAdmin } = require("../middleware/auth");

router.route("/").get(protect, getPrivateRoute);
// router.route("/").get(protect, getPrivateRoute);
router.route("/storeadmin").get(protectStoreAdmin, getPrivateRoute);


module.exports = router;
