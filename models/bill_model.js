const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  billing_amount: {
    type: Number,
    required: true,
  },
  number_of_minutes_used: {
    type: Number,
    required: true,
  },
  number_of_texts_sent: {
    type: Number,
    required: true,
  },
  amount_of_data_consumed: {
    type: Number,
    required: true,
  },
  number_of_outgoing_calls: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Bills", billSchema);
