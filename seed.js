const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rgs_constructor_v2');

const ProjectSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  category: String,
  description: String,
  client: String,
  location: String,
  duration: String,
  image: String,
  gallery: [String],
  featured: Boolean,
});

const ServiceSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  icon: String,
  image: String,
  features: [String],
});

const Project = mongoose.model('Project', ProjectSchema);
const Service = mongoose.model('Service', ServiceSchema);

async function seed() {
  await Project.deleteMany({});
  await Service.deleteMany({});

  const projects = [
    {
      title: 'Nexus Corporate Tower',
      slug: 'nexus-corporate-tower',
      category: 'Commercial',
      description: 'A 45-story commercial masterpiece featuring sustainable architecture.',
      client: 'Nexus Group',
      location: 'Metro City, NY',
      duration: '36 Months',
      image: 'https://images.unsplash.com/photo-1574523363321-70067645f7f3?auto=format&fit=crop&q=80',
      featured: true,
    },
    {
      title: 'Apex Manufacturing Plant',
      slug: 'apex-manufacturing-plant',
      category: 'Industrial',
      description: 'State-of-the-art heavy industrial complex.',
      client: 'Apex Industries',
      location: 'Detroit, MI',
      duration: '24 Months',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356f27?auto=format&fit=crop&q=80',
      featured: true,
    },
    {
      title: 'Grand Metro Terminal',
      slug: 'grand-metro-terminal',
      category: 'Infrastructure',
      description: 'Modern transport hub for 50,000 daily commuters.',
      client: 'City Transit Authority',
      location: 'Chicago, IL',
      duration: '48 Months',
      image: 'https://images.unsplash.com/photo-1541888081622-c9a92ab35c91?auto=format&fit=crop&q=80',
      featured: true,
    },
    {
      title: 'Luxury Heights Estate',
      slug: 'luxury-heights-estate',
      category: 'Residential',
      description: 'Premium housing community with 200 villas.',
      client: 'Heights Developers',
      location: 'Miami, FL',
      duration: '18 Months',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
      featured: false,
    }
  ];

  const services = [
    {
      title: 'Commercial Construction',
      slug: 'commercial-construction',
      description: 'State-of-the-art corporate offices, retail complexes, and commercial plazas built to international standards.',
      icon: 'Building2',
      features: ['High-rise construction', 'Sustainable design', 'Smart building integration']
    },
    {
      title: 'Industrial Infrastructure',
      slug: 'industrial-infrastructure',
      description: 'Heavy-duty factories, warehouses, and manufacturing plants engineered for maximum operational efficiency.',
      icon: 'HardHat',
      features: ['Factory layouts', 'Heavy equipment foundations', 'Logistics centers']
    },
    {
      title: 'Architectural Design',
      slug: 'architectural-design',
      description: 'Visionary planning and structural engineering using cutting-edge BIM and 3D visualization technology.',
      icon: 'Ruler',
      features: ['3D Modeling', 'BIM Coordination', 'Structural integrity analysis']
    }
  ];

  await Project.insertMany(projects);
  await Service.insertMany(services);

  console.log('Database seeded with projects and services!');
  process.exit();
}

seed();
