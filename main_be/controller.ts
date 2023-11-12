import { Request, Response } from "express";
import taskModel from "./taskModel";
import { ObjectId } from "mongodb";

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await taskModel.create({
      task: {
        todo: {
          title: "todo",
          data: [],
        },

        progress: {
          title: "progress",
          data: [],
        },
        Done: {
          title: "progress",
          data: [],
        },
      },
    });

    return res.status(201).json({
      message: "project created",
      data: project,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const viewProject = async (req: Request, res: Response) => {
  try {
    const project = await taskModel.find();

    return res.status(200).json({
      message: "project found",
      data: project,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const viewProjectOne = async (req: Request, res: Response) => {
  try {
    const { projectID } = req.params;
    const project = await taskModel.findById(projectID);

    return res.status(200).json({
      message: "one project found",
      data: project,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const deleteProjectOne = async (req: Request, res: Response) => {
  try {
    const { projectID } = req.params;
    const project = await taskModel.findByIdAndDelete(projectID);

    return res.status(200).json({
      message: "one project deleted",
      data: project,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const addTaskToProject = async (req: Request, res: Response) => {
  try {
    const { projectID } = req.params;
    const { title } = req.body;

    const project: any = await taskModel.findById(projectID);

    // let file = {
    //   [title]: {
    //     id: title,
    //     data: [],
    //   },
    // };

    const newProject = await taskModel.findByIdAndUpdate(
      projectID,
      {
        task: {
          ...project?.task,
          todo: {
            ...project?.task.todo,
            data: [
              ...project?.task.todo.data,
              { id: new ObjectId(), task: title },
            ],
          },
        },
      },
      { new: true }
    );

    console.log(project?.task.todo.data);
    console.log(project?.task.todo);
    return res.status(200).json({
      message: "one task added to project",
      data: newProject,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const addToProject = async (req: Request, res: Response) => {
  try {
    const { projectID } = req.params;
    const { title } = req.body;

    const project: any = await taskModel.findById(projectID);

    let file = {
      [title]: {
        id: title,
        data: [],
      },
    };

    const newProject = await taskModel.findByIdAndUpdate(
      projectID,
      {
        task: {
          ...project?.task,

          [title]: {
            id: title,
            data: [],
          },
        },
      },
      { new: true }
    );

    console.log(project?.task);
    return res.status(200).json({
      message: "one project deleted",
      data: newProject,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

// ... (your existing imports)

export const addTaskToSection = async (req: Request, res: Response) => {
  try {
    const { projectID } = req.params;
    const { section, title } = req.body;

    const project: any = await taskModel.findById(projectID);

    const newProject: any = await taskModel.findByIdAndUpdate(
      projectID,
      {
        task: {
          ...project?.task,
          [section]: {
            ...project?.task[section],
            data: [
              ...project?.task[section].data,
              { id: new ObjectId(), task: title },
            ],
          },
        },
      },
      { new: true }
    );

    console.log(newProject?.task[section].data);
    console.log(newProject?.task[section]);

    return res.status(200).json({
      message: `Task added to ${section} section of the project`,
      data: newProject,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
