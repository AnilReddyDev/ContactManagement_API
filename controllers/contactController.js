const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

//@desc POST all contacts
//@route POST /api/contacts
//@access private
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
    user_id:req.user.id,
  });
  res.status(201).json(contact);
});

//@desc put all contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    if(contact.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User don't have the permission to update other user contacts");
    }
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
//@access private
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
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have the permission to delete other user contacts");
  }
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  if (!deletedContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(deletedContact);
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContact,
};
