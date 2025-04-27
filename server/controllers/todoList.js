const TodoList = require("../models/TodoList.js");

const getTodoList = async (req, res) => {
  try {
    const todoList = await TodoList.find({ user: req.user._id });

    if (!todoList) {
      return res.status(404).json({ message: "No todos found" });
    }

    res.status(200).json({
      user: req.user._id,
      todoList,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const createTodoList = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const todo = new TodoList({
      name: title,
      items: [],
      user: req.user._id,
    });

    await todo.save();

    if (!todo) {
      return res.status(404).json({ message: "No todos found" });
    }

    res.status(200).json({ message: "Todo created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add todo" });
  }
};

const deleteTodoList = async (req, res) => {
  try {
    const { id } = req.params;

    const todos = await TodoList.findByIdAndDelete(id);

    if (!todos) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      user: req.user._id,
      todos,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

module.exports = {
  getTodoList,
  createTodoList,
  deleteTodoList,
};
