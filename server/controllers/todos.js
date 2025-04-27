const TodoList = require("../models/TodoList.js");
const { v4 } = require("uuid");

const getTodos = async (req, res) => {
  const { listId: id } = req.params;
  try {
    const todos = await TodoList.findOne({ _id: id });
    if (!todos) {
      return res.status(404).json({ message: "No todos found" });
    }

    res.status(200).json({
      todos,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, listId: id } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const list = await TodoList.findOne({ _id: id });

    if (!list) {
      return res.status(404).json({ message: "Todo List not found" });
    }

    const newTodo = {
      title,
      completed: false,
      id: v4(),
    };

    list.items.push(newTodo);
    await list.save();

    res.status(200).json({ message: "Todo created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add todo" });
  }
};

const markTodoAsCompleted = async (req, res) => {
  try {
    const { listId, todoId } = req.body;

    const list = await TodoList.findOne({ _id: listId });

    if (!list) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    const item = list.items.id(todoId);

    if (!item) {
      return res.status(404).json({ message: "ToDo Item not found" });
    }

    item.completed = true;
    await list.save();

    res.status(200).json({
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark todo as completed" });
  }
};

const markTodoAsPending = async (req, res) => {
  try {
    const { listId, todoId } = req.body;

    const list = await TodoList.findOne({ _id: listId });

    if (!list) {
      return res.status(404).json({ message: "Todo list not found" });
    }
    const item = list.items.id(todoId);
    if (!item) {
      return res.status(404).json({ message: "Todo Item not found" });
    }
    item.completed = false;
    await list.save();

    res.status(200).json({
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark todo as pending" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { listId, todoId } = req.body;

    const list = await TodoList.findOne({ _id: listId });

    if (!list) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const item = list.items.id(todoId);
    if (!item) {
      return res.status(404).json({ message: "Todo Item not found" });
    }
    item.deleteOne();
    await list.save();

    res.status(200).json({
      message: "Todo deleted successfully",
      user: req.user._id,
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
