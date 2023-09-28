const express = require("express");
const router = express.Router()
const {createUser, loginUser, currentUser} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenhandler");
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/current",validateToken, currentUser);

module.exports = router;