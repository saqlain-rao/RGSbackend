import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project';

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Project.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Project.find();
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Project.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Project.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
