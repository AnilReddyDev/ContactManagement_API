const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"user",
    },
    name: {
      type: String,
      required: [true, "Please enter the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email address"],
    },
    phone: {
      type: String,
      required: [true, "Please enter the phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
