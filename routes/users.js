const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// router.get("/new", UsersController.New);
router.get("/signup", UsersController.New);
router.post("/", UsersController.Create);

module.exports = router;
