import Column from "../models/columnModel.js";
import mongoose from "mongoose";
import Task from "../models/taskModel.js";
import { RequestHandler } from "express";

interface CreateColumnBody {
  title: string;
}

const getColumns: RequestHandler = async (req, res) => {
  try {
    const user_id = req.user!._id;
    const columns = await Column.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(columns);
  } catch (error) {
    console.error("Erro ao buscar colunas:", error);
    res.status(500).json({
      error: "Erro interno do servidor ao buscar colunas.",
      details: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};

const getColumn: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such column" });
    return;
  }

  const column = await Column.findById(id);

  if (!column) {
    res.status(404).json({ error: "No such column" });
    return;
  }
  res.status(200).json(column);
};

const createColumn: RequestHandler = async (req, res) => {
  const { title } = req.body as CreateColumnBody;

  try {
    const user_id = req.user!._id;
    const lastColumn = await Column.findOne({ user_id }).sort({ position: -1 });

    const newPosition = lastColumn ? lastColumn.position + 1 : 0;

    const column = await Column.create({
      title,
      position: newPosition,
      user_id,
    });
    res.status(200).json(column);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const deleteColumn: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such column" });
    return;
  }

  const hasTasks = await Task.exists({ column: id });

  if (hasTasks) {
    res.status(409).json({
      error: "Cannot delete column with active tasks",
    });
    return;
  }

  const column = await Column.findOneAndDelete({ _id: id });
  if (!column) {
    res.status(404).json({ error: "No such column" });
    return;
  }
  res.status(200).json(column);
};

const updateColumn: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such column" });
    return;
  }

  const column = await Column.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!column) {
    res.status(404).json({ error: "No such column" });
    return;
  }
  res.status(200).json(column);
};

export { createColumn, getColumn, getColumns, deleteColumn, updateColumn };
