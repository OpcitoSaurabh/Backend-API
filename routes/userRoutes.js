// imports
const express = require("express");
const {currentUser, loginUser, registerUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
// const
const router = express.Router();
// setting routes 
// if route have same path for different method you can assign in one line 
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current", validateToken, currentUser)


// export
module.exports = router;