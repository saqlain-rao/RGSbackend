import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from './config/env';
import { connectDB } from './config/db';
import User from './models/User';
import bcrypt from 'bcryptjs';

// Connect to database
connectDB().then(async () => {
  // Seed default admin user if none exists
  try {
    const adminExists = await User.findOne({ email: 'admin@rgsconstructor.com' });
    if (!adminExists) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@rgsconstructor.com',
        password: 'admin123', 
        role: 'admin'
      });
      console.log('Default admin user created successfully.');
    } else {
      adminExists.password = 'admin123';
      await adminExists.save();
      console.log('Admin password force reset to default.');
    }
  } catch (err) {
    console.error('Failed to seed default admin:', err);
  }
});

const app = express();

// Trust proxy for Render deployment (fixes rate limit crash)
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin: function (origin, callback) {
    // Allow all origins (useful for Vercel preview URLs which change dynamically)
    callback(null, true);
  },
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use('/api', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Static folder for local uploads fallback
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes mapping
import routes from './routes';
app.use('/api', routes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});
