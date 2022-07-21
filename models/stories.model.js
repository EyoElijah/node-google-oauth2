const mongoose = require("mongoose");

const StoriesSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
    trim: true,
  },
  body: {
    type: "string",
    required: true,
  },
  status: {
    type: "string",
    default: "public",
    enum: ["public", "private"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Story", StoriesSchema);
