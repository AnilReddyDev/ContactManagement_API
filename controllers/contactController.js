//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = (_req, res) => {
    res.status(200).json({ message: "get all the contacts" });
};

//@desc POST all contacts
//@route POST /api/contacts
//@access public
const createContact = (req, res) => {
    console.log("The request Body is :",req.body)
    const {Name, phone, email} = req.body;
    if(!Name || !phone || !email){
        res.status(400);
        throw new Error("All fiels are mandatory")
    }
    res.status(201).json({ message: "Create Contact" });
};

//@desc put all contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req, res) => {
    res.status(200).json({ message: `update contact for ${req.params.id}` });
};

//@desc get all contacts
//@route GET /api/contacts/:id
//@access public
const getContact = (req, res) => {
    res.status(200).json({ message: `get contact of ${req.params.id}` });
};

//@desc delete all contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
    res.status(200).json({ message: `delete contact of ${req.params.id}` });
};




module.exports = { 
    getContacts, 
    createContact, 
    updateContact, 
    getContact, 
    deleteContact 
}