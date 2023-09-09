const taskModel = require("../models/task.model");

const getAllTasks = async () => {
  try {
    return await taskModel.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

const createTask = async (task) => {
  try {
    return await taskModel.create(task);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTaskById = async (id) => {
  try {
    return await taskModel.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTask = async (id, task) => {
  try {
    const old_task = await taskModel.findById(id);
    if (!task) throw new Error("Task not found");
    old_task.title = task.title || old_task.title;
    old_task.description = task.description || old_task.description;
    old_task.completed = task.completed || old_task.completed;
    return old_task.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTask = async (id) => {
  try {
    await taskModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
