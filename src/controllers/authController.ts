import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: (process.env.JWT_EXPIRE || '30d') as any,
  });
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, error: 'User already exists' });
      return;
    }
    
    const user = await User.create({ name, email, password, role });
    
    res.status(201).json({
      success: true,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Please provide an email and password' });
      return;
    }
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }
    
    // @ts-ignore
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }
    
    res.status(200).json({
      success: true,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
