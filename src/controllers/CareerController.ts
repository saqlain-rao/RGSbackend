import { Request, Response, NextFunction } from 'express';
import Career from '../models/Career';

export const createCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Career.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const getCareers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Career.find();
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    next(error);
  }
};

export const getCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Career.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Career.findByIdAndUpdate(req.params.id, req.body, {
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

export const deleteCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Career.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
