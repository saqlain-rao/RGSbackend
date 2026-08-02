import { Request, Response, NextFunction } from 'express';
import Testimonial from '../models/Testimonial';

export const createTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const getTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Testimonial.find();
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    next(error);
  }
};

export const getTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Testimonial.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
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

export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Testimonial.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
