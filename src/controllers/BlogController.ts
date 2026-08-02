import { Request, Response, NextFunction } from 'express';
import Blog from '../models/Blog';

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Blog.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Blog.find();
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Blog.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, {
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

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Blog.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
