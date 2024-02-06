const express = require("express");
const router = express.Router();

const {
  getBills,
  createBill,
  deleteBill,
  updateBill,
  testBill,
} = require("../controllers/bills_controllers");

router.get("/test", testBill);
router.get("/", getBills);
router.post("/", createBill);
router.delete("/", deleteBill);
router.patch("/", updateBill);

module.exports = router;
