import { Request, Response } from 'express';
import Visitor from '../models/Visitor';

// @desc    Get total visitors count
// @route   GET /api/visitors
// @access  Public
export const getVisitorCount = async (req: Request, res: Response): Promise<void> => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: 0 });
    }
    res.status(200).json({ success: true, data: visitor.count });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Increment visitor count
// @route   POST /api/visitors/track
// @access  Public
export const trackVisitor = async (req: Request, res: Response): Promise<void> => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: 1 });
    } else {
      visitor.count += 1;
      await visitor.save();
    }
    res.status(200).json({ success: true, data: visitor.count });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
