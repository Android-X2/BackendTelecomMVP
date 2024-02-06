const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  city_location: {
    type: String,
    required: true,
  },
  state_location: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
