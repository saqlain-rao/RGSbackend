import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  company: { type: String },
  role: { type: String },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  image: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
