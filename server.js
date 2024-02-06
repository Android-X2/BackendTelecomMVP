require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./config/db");

const testRoutes = require("./routes/testRoutes");
const bills_routes = require("./routes/bills_routes");
const customer_routes = require("./routes/customer_routes");

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/test", testRoutes);
app.use("/bills", bills_routes);
app.use("/customers", customer_routes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("You are on!");
});

app.get("/", (req, res) => {
  res.json("Hello from backend test");
});
