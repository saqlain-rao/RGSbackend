import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Career', careerSchema);
