import express from "express";

import {
  createColumn,
  getColumns,
  getColumn,
  deleteColumn,
  updateColumn,
} from "../controllers/columnController.js";

import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getColumns);

router.get("/:id", getColumn);

router.post("/", createColumn);

router.delete("/:id", deleteColumn);

router.patch("/:id", updateColumn);

export default router;
