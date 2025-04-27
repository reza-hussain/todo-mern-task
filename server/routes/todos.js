const {
  getTodos,
  createTodo,
  deleteTodo,
  markTodoAsCompleted,
  markTodoAsPending,
} = require("../controllers/todos.js");
const verifyToken = require("../middleware/auth.js");

const router = require("express").Router();

router.get("/getTodos/:listId", verifyToken, getTodos);
router.post("/createTodo", verifyToken, createTodo);
router.post("/deleteTodo", verifyToken, deleteTodo);
router.put("/markAsCompleted", verifyToken, markTodoAsCompleted);
router.put("/markAsPending", verifyToken, markTodoAsPending);

module.exports = router;
