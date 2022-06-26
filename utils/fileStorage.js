const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,   
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Toddle',
        resource_type: 'auto',
        allowedFormats: ['jpeg', 'png', 'jpg', 'mp4', 'mp3', 'ogg', 'gif', 'pdf'],
    }
});

module.exports = {
    cloudinary,
    storage
}