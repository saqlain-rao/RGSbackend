import nodemailer from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
  html?: string;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  // Option 1: Use Web3Forms (HTTP API - Bypasses Render SMTP Block)
  if (process.env.WEB3FORMS_KEY) {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        name: 'RGS Constructor System',
        email: 'noreply@rgsconstructor.com',
        subject: options.subject,
        message: options.html || options.message,
      })
    });
    
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Web3Forms Error: ${result.message || 'Failed to send'}`);
    }
    return;
  }

  // Option 2: Fallback to Nodemailer (May be blocked on free tiers)
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'RGS Constructor'} <${process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(message);
};

export default sendEmail;
