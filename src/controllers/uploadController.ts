import { Request, Response } from 'express';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'Please upload a file' });
      return;
    }
    res.status(200).json({ success: true, url: req.file.path });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to upload image' });
  }
};
