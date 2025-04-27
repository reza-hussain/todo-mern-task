const mongoose = require("mongoose");
const toDoItemSchema = require("./TodoItem");

const toDoListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    items: [toDoItemSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const TodoList = mongoose.model("TodoList", toDoListSchema);
module.exports = TodoList;
