const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const connectDB = asyncHandler(async () => {
  const conn = mongoose.connect(process.env.MONGO_URI);
  console.log("db connected successfully");
});

module.exports = connectDB;
