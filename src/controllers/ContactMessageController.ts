import { Request, Response, NextFunction } from 'express';
import ContactMessage from '../models/ContactMessage';
import sendEmail from '../utils/sendEmail';

export const createContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await ContactMessage.create(req.body);

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'saqlainrao211@gmail.com';
    if (adminEmail) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #d32f2f;">New Contact Request - RGS Constructor</h2>
          <p><strong>From:</strong> ${doc.name} (${doc.email})</p>
          <p><strong>Phone:</strong> ${doc.phone}</p>
          <p><strong>Subject:</strong> ${doc.subject}</p>
          <hr />
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${doc.message}</p>
          <br/>
          <p><i>Log in to your admin panel to manage this request.</i></p>
        </div>
      `;

      try {
        await sendEmail({
          email: adminEmail,
          subject: `New Request: ${doc.subject} - RGS Constructor`,
          message: `New Contact Request from ${doc.name}. Message: ${doc.message}`,
          html: emailHtml
        });
        console.log('Email notification sent successfully to', adminEmail);
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Do not fail the request if email fails
      }
    }

    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await ContactMessage.find();
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    next(error);
  }
};

export const getContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await ContactMessage.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
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

export const deleteContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
