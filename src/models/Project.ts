import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  client: { type: String, required: true },
  duration: { type: String, required: true },
  technologies: [{ type: String }],
  location: { type: String, required: true },
  mainImage: { type: String, required: true },
  gallery: [{ type: String }],
  beforeAfter: {
    beforeImage: { type: String },
    afterImage: { type: String }
  },
  status: { type: String, enum: ['Completed', 'Ongoing'], default: 'Completed' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
