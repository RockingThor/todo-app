import { Request, Response } from "express";
import Task from "../models/task-model";
import { CustomReq } from "../src/middleware";
import { ITask } from "../types";

export const getAllTasks = async (req: CustomReq, res: Response) => {
  try {
    const user = req.user;
    const tasks = await Task.find({ user });
    return res.status(200).send(tasks);
  } catch (err) {
    console.log("Error in getAllTasks: ", err);
    throw err;
  }
};

export const createTask = async (req: CustomReq, res: Response) => {
  try {
    const { user } = req;
    const { categoryId, name, date }: ITask = req.body;
    const task = await Task.create({
      user,
      categoryId,
      name,
      date,
    });
    if (task) {
      return res.status(200).send("Task created successfully");
    }
  } catch (err) {
    console.log("Error in createTask: ", err);
    throw err;
  }
};

export const toggleTask = async (req: CustomReq, res: Response) => {
  try {
    const { user } = req;
    const { isCompleted } = req.body;
    const { id } = req.params;

    const task = await Task.updateOne(
      { _id: id, user },
      { $set: { isCompleted } }
    );
    if (task) {
      return res.status(200).send("Task updated successfully");
    }
  } catch (err) {
    console.log("Error in toggleTask: ", err);
    throw err;
  }
};

export const getAllTasksByCategoryId = async (
  req: CustomReq,
  res: Response
) => {
  try {
    const { user } = req;
    const { categoryId } = req.params;
    const tasks = await Task.find({ user, categoryId });
    return res.status(200).send(tasks);
  } catch (err) {
    console.log("Error in getAllTasksByCategoryId: ", err);
    throw err;
  }
};

export const getAllCompletedTasks = async (req: CustomReq, res: Response) => {
  try {
    const { user } = req;
    const tasks = await Task.find({ user, isCompleted: true });
    return res.status(200).send(tasks);
  } catch (err) {
    console.log("Error in getAllCompletedTasks: ", err);
    throw err;
  }
};

export const getTasksForToday = async (req: CustomReq, res: Response) => {
  try {
    const { user } = req;
    const todayISODate = new Date();
    todayISODate.setHours(0, 0, 0, 0);
    const tasks = await Task.find({ user, date: todayISODate.toISOString() });
    return res.status(200).send(tasks);
  } catch (err) {
    console.log("Error in getTasksForToday: ", err);
    throw err;
  }
};

export const updateTask = async (req: CustomReq, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { name, date, categoryId }: ITask = req.body;
    const task = await Task.updateOne(
      { _id: id, user },
      { $set: { name, date, categoryId } }
    );
    if (task) {
      return res.status(200).send("Task updated successfully");
    }
  } catch (err) {
    console.log("Error in updateTask: ", err);
    throw err;
  }
};
