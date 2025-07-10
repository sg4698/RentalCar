const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');  // Required to convert buffer into a stream

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload the buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'CarRental' }, (error, result) => {
      if (error) return reject(error);
      resolve({
        public_id: result.public_id,
        url: result.secure_url
      });
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadToCloudinary;
