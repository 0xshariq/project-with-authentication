import { Task } from "../models/task.js";

export const createTask = async (req, res, next) => {
  const { title, description } = req.body;

  // Validate input
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }

  // Validate user
  if (!req.user || !req.user._id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User not authenticated",
    });
  }

  try {
    // Create the task
    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    // Pass errors to error-handling middleware
    next(error);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
