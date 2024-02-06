const express = require("express");
const router = express.Router();

const {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  test_customer,
  getCustomer,
} = require("../controllers/customer_controllers");

router.get("/test", test_customer);
router.get("/", getCustomer);
router.post("/", createCustomer);
router.delete("/", deleteCustomer);
router.patch("/", updateCustomer);

module.exports = router;
