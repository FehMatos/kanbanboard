import express from "express";

import {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);
router.get("/", getTasks);

router.get("/:id", getTask);

router.post("/", createTask);

router.delete("/:id", deleteTask);

router.patch("/:id", updateTask);

export default router;
