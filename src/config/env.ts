import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/rgs_constructor_v2',
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key_change_in_prod',
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'qlic7qsi',
    apiKey: process.env.CLOUDINARY_API_KEY || '715121542414162',
    apiSecret: process.env.CLOUDINARY_API_SECRET || 'XlxI0FbQCZbnvMmuSfgN1v1uPSk'
  },
  email: {
    host: process.env.SMTP_HOST || '',
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'noreply@rgsconstructor.com'
  }
};
