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
    return new Promise((resolve, reject) => {
      const https = require('https');
      const data = JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: options.subject,
        message: options.html || options.message,
        from_name: 'RGS Constructor System'
      });

      const req = https.request('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      }, (res: any) => {
        let body = '';
        res.on('data', (chunk: any) => body += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve();
          } else {
            reject(new Error(`Web3Forms Error: ${body}`));
          }
        });
      });

      req.on('error', (e: any) => reject(e));
      req.write(data);
      req.end();
    });
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
