const router = require("express").Router();

const userRoutes = require("./user.js");
const todoRoutes = require("./todos.js");
const todoListRoutes = require("./todoList.js");

router.use("/users", userRoutes);
router.use("/todos", todoRoutes);
router.use("/todoList", todoListRoutes);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Todo API" });
});

module.exports = router;
