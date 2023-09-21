const express = require("express");
const router = express.Router();
const {
    getContacts,
    createContact,
    updateContact,
    getContact,
    deleteContact
} = require("../controllers/contactController")

router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).get(getContact).delete(deleteContact);


module.exports = router;