import { Request, Response, NextFunction } from 'express';
import Settings from '../models/Settings';

export const createSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Settings.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const getSettingss = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Settings.find();
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    next(error);
  }
};

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Settings.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Settings.findByIdAndUpdate(req.params.id, req.body, {
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

export const deleteSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Settings.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
