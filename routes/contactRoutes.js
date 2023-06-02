// imports
const express = require("express");
const {getContact, postContact, putContact, deleteContact, getSingleContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
// const
const router = express.Router();
// setting routes 
// this will assign to each route in this controller
router.use(validateToken)
// if route have same path for different method you can assign in one line 
router.route("/").get(getContact).post(postContact)
router.route("/:id").put(putContact).delete(deleteContact).get(getSingleContact)

// export
module.exports = router