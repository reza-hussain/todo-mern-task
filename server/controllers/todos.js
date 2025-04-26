const TodoItem = require("../models/TodoItem.js");

const getTodos = async (req, res) => {
  try {
    const todos = await TodoItem.find({ user: req.user._id });
    if (!todos) {
      return res.status(404).json({ message: "No todos found" });
    }

    res.status(200).json({
      user: req.user._id,
      todos,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const todo = new TodoItem({
      title,
      user: req.user._id,
      completed: false,
    });

    await todo.save();
    const todos = await TodoItem.find({
      message: "Todo created successfully",
      user: req.user._id,
    });

    if (!todoList) {
      return res.status(404).json({ message: "No todos found" });
    }

    res.status(200).json({ user: req.user._id, todos });
  } catch (error) {
    res.status(500).json({ error: "Failed to add todo" });
  }
};

const markTodoAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const todos = await TodoItem.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    if (!todos) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      user: req.user._id,
      todos,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark todo as completed" });
  }
};

const markTodoAsPending = async (req, res) => {
  try {
    const { id } = req.params;

    const todos = await TodoItem.findByIdAndUpdate(
      id,
      { completed: false },
      { new: true }
    );

    if (!todos) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      user: req.user._id,
      todos,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark todo as completed" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todos = await TodoItem.findByIdAndDelete(id);

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
  getTodos,
  createTodo,
  markTodoAsCompleted,
  markTodoAsPending,
  deleteTodo,
};
