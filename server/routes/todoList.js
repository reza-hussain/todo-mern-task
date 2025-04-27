const {
  getTodoList,
  createTodoList,
  deleteTodoList,
} = require("../controllers/todoList.js");
const verifyToken = require("../middleware/auth.js");

const router = require("express").Router();

router.get("/getTodoList", verifyToken, getTodoList);
router.post("/createTodoList", verifyToken, createTodoList);
router.delete("/deleteTodoList/:id", verifyToken, deleteTodoList);

module.exports = router;
