import { Request, Response, NextFunction } from 'express';
import FAQ from '../models/FAQ';

export const createFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const getFAQs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await FAQ.find();
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    next(error);
  }
};

export const getFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await FAQ.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
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

export const deleteFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await FAQ.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
