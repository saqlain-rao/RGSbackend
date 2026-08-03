const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: 'qlic7qsi',
  api_key: '715121542414162',
  api_secret: 'XlxI0FbQCZbnvMmuSfgN1v1uPSk'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'rgs-constructor',
      format: 'webp',
      public_id: `test-upload`,
    };
  },
});

const upload = multer({ storage: storage });
const app = express();

app.post('/upload', upload.single('image'), (req, res) => {
  console.log('REQ.FILE:', req.file);
  res.json({ url: req.file.path });
});

app.listen(3000, async () => {
  console.log('Server started');
  // Trigger an upload manually
  const FormData = require('form-data');
  const axios = require('axios');
  
  fs.writeFileSync('dummy.png', 'fake image data');
  
  const form = new FormData();
  form.append('image', fs.createReadStream('dummy.png'));
  
  try {
    const response = await axios.post('http://localhost:3000/upload', form, {
      headers: form.getHeaders()
    });
    console.log('RESPONSE:', response.data);
  } catch(e) {
    console.error(e.response ? e.response.data : e.message);
  }
  process.exit(0);
});
