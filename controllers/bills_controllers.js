const Bills = require("../models/bill_model");

const getBills = async (req, res) => {
  const { customer_id } = req.body;

  const bills = await Bills.find({ customer_id }).sort({ createdAt: -1 });

  res.status(200).json(bills);
};

const createBill = async (req, res) => {
  const {
    customer_id,
    billing_amount,
    number_of_minutes_used,
    number_of_texts_sent,
    amount_of_data_consumed,
    number_of_outgoing_calls,
  } = req.body;

  let emptyFields = [];
  if (!customer_id) {
    emptyFields.push("customer_id");
  }
  if (!billing_amount) {
    emptyFields.push("billing_amount");
  }
  if (!number_of_minutes_used) {
    emptyFields.push("number_of_minutes_used");
  }
  if (!number_of_texts_sent) {
    emptyFields.push("number_of_texts_sent");
  }
  if (!amount_of_data_consumed) {
    emptyFields.push("amount_of_data_consumed");
  }
  if (!number_of_outgoing_calls) {
    emptyFields.push("number_of_outgoing_calls");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the missing fields", emptyFields });
  }

  try {
    const bill = await Bills.create({
      customer_id,
      billing_amount,
      number_of_minutes_used,
      number_of_texts_sent,
      amount_of_data_consumed,
      number_of_outgoing_calls,
    });
    res.status(200).json({ message: "Bill has been created", bill });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBill = async (req, res) => {
  const { _id } = req.body;

  const bill = await Bills.findOneAndDelete({
    _id: _id,
    //find the way to get the object of the native id
  });
  if (!bill) {
    return res.status(400).json({ message: "Customer does not exist." });
  }
  res.status(200).json({ message: "Bill has been deleted" });
};

const updateBill = async (req, res) => {
  const { _id } = req.body;

  const bill = await Bills.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      ...req.body,
    },
    { new: true }
  );
  if (!bill) {
    return res.status(404).json({ error: `No such bill exists` });
  }
  res.status(200).json({ message: "Bill has been updated", bill });
};

const testBill = async (req, res) => {
  return res.status(200).json({ message: "Bills route works!" });
};

module.exports = {
  getBills,
  createBill,
  deleteBill,
  updateBill,
  testBill,
};
