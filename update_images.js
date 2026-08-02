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

const Project = mongoose.model('Project', ProjectSchema);

async function run() {
  const projects = await Project.find();
  if (projects.length >= 4) {
    projects[0].image = 'http://localhost:5000/uploads/project1.png';
    projects[1].image = 'http://localhost:5000/uploads/project2.png';
    projects[2].image = 'http://localhost:5000/uploads/project3.png';
    projects[3].image = 'http://localhost:5000/uploads/project4.png';
    
    await projects[0].save();
    await projects[1].save();
    await projects[2].save();
    await projects[3].save();
  }
  console.log('Project images updated!');
  process.exit();
}
run();
