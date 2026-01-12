import Task from "../models/taskModel.js";
import mongoose from "mongoose";
import { RequestHandler } from "express";

interface CreateTaskBody {
  description: string;
  column: string;
  position: number;
}

export const getTasks: RequestHandler = async (req, res) => {
  const user_id = req.user!._id;

  const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

export const getTask: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such Task" });
    return;
  }

  const task = await Task.findById(id);

  if (!task) {
    res.status(404).json({ error: "No such Task" });
    return;
  }

  res.status(200).json(task);
};

export const createTask: RequestHandler = async (req, res) => {
  const { description, column, position } = req.body as CreateTaskBody;
  const user_id = req.user!._id;

  try {
    const task = await Task.create({
      description,
      column,
      position,
      user_id,
    });

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

export const deleteTask: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such Task" });
    return;
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    res.status(404).json({ error: "No such Task" });
    return;
  }

  res.status(200).json(task);
};

export const updateTask: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such Task" });
    return;
  }

  const task = await Task.findOneAndUpdate({ _id: id }, req.body);

  if (!task) {
    res.status(404).json({ error: "No such Task" });
    return;
  }

  res.status(200).json(task);
};
