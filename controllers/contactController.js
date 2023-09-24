const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc POST all contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request Body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone, //If scheme variable name is different from destructured variable then Scheme Name ex: Names = name;
  });
  res.status(201).json(contact);
});

//@desc put all contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedContact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(updatedContact);
});

//@desc get contacts
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  });

//@desc delete all contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContact,
};
