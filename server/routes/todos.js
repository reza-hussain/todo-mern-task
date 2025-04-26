const {
  getTodos,
  createTodo,
  deleteTodo,
  markTodoAsCompleted,
  markTodoAsPending,
} = require("../controllers/todos.js");
const verifyToken = require("../middleware/auth.js");

const router = require("express").Router();

router.get("/getTodos", verifyToken, getTodos);
router.post("/createTodo", verifyToken, createTodo);
router.delete("/deleteTodo/:id", verifyToken, deleteTodo);
router.put("/markAsCompleted/:id", verifyToken, markTodoAsCompleted);
router.put("/markAsPending/:id", verifyToken, markTodoAsPending);

module.exports = router;
