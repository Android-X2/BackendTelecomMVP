const Customer = require("../models/customer_model");

const getCustomer = async (req, res) => {
  const { phone_number } = req.body;

  const customer = await Customer.findOne({
    phone_number: phone_number,
  });
  if (!customer) {
    return res
      .status(404)
      .json({ error: `No such customer exists for ${phone_number}.` });
  }
  res.status(200).json(customer);
};

const createCustomer = async (req, res) => {
  const {
    first_name,
    last_name,
    phone_number,
    city_location,
    state_location,
    gender,
  } = req.body;

  let emptyFields = [];
  if (!first_name) {
    emptyFields.push("first_name");
  }
  if (!last_name) {
    emptyFields.push("last_name");
  }
  if (!phone_number) {
    emptyFields.push("phone_number");
  }
  if (!city_location) {
    emptyFields.push("city_location");
  }
  if (!state_location) {
    emptyFields.push("state_location");
  }
  if (!gender) {
    emptyFields.push("gender");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the missing fields", emptyFields });
  }

  const exists = await Customer.findOne({
    phone_number: phone_number,
  });
  if (exists) {
    return res.status(400).json({ message: "Customer already exists" });
  }
  try {
    const customer = await Customer.create({
      first_name,
      last_name,
      phone_number,
      city_location,
      state_location,
      gender,
    });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  const { phone_number } = req.body;

  const customer = await Customer.findOneAndDelete({
    phone_number: phone_number,
  });
  if (!customer) {
    return res
      .status(404)
      .json({ error: `No such customer exists with number: ${phone_number} ` });
  }
  res.status(200).json({ message: "Customer has been deleted." });
};

const updateCustomer = async (req, res) => {
  const {
    first_name,
    last_name,
    phone_number,
    city_location,
    state_location,
    gender,
  } = req.body;

  const customer = await Customer.findOneAndUpdate(
    { phone_number: phone_number },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!customer) {
    return res
      .status(404)
      .json({ error: `No such customer exists with number: ${phone_number}` });
  }
  res.status(200).json({ messeage: "Customer has been updated.", customer });
};

const test_customer = async (req, res) => {
  res.status(200).json({ message: "Customer Route works!" });
};

module.exports = {
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
  test_customer,
};
