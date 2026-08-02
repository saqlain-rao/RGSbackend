import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, required: true, default: 'RGS Constructor' },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  address: { type: String, required: true },
  googleMapsUrl: { type: String },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
    youtube: { type: String }
  },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String }
  },
  homepageOrder: [{ type: String }], // e.g. ['hero', 'about', 'services', 'projects', 'stats', 'video', 'testimonials', 'clients', 'gallery', 'faq', 'blogs', 'contact']
  heroContent: {
    heading: { type: String },
    subheading: { type: String },
    backgroundImage: { type: String }
  },
  aboutPreview: {
    heading: { type: String },
    text: { type: String },
    image: { type: String }
  },
  whyChooseUs: [{
    title: { type: String },
    description: { type: String },
    icon: { type: String }
  }],
  statistics: [{
    label: { type: String },
    value: { type: String },
    suffix: { type: String }
  }]
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
