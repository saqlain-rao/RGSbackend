const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'qlic7qsi',
  api_key: '715121542414162',
  api_secret: 'XlxI0FbQCZbnvMmuSfgN1v1uPSk'
});

// Try to upload a base64 dummy image
cloudinary.uploader.upload("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", { folder: 'test' }, function(error, result) {
  if (error) {
    console.error('CLOUDINARY ERROR:', error);
  } else {
    console.log('CLOUDINARY SUCCESS:', result.secure_url);
  }
});
