require("dotenv").config({
  path: "./config/config.env",
});

const app = require("./app");
const morgan = require("morgan");
const asyncHandler = require("express-async-handler");
const connectDB = require("./config/db");

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const start = asyncHandler(async () => {
  connectDB();
  app.listen(
    port,
    console.log(
      `server running in ${process.env.NODE_ENV} mode on port ${port} `
    )
  );
});

start();
