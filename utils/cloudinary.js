const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'motani',
    api_key: '969415226661787',
    api_secret: '26zj-sGhJlghhTV6JTBCv6YezDM'
})

module.exports = cloudinary;