import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true, default: 'Admin' },
  image: { type: String, required: true },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: true },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
