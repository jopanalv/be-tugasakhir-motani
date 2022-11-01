const { Banners } = require('../models');
const cloudinary = require('../utils/cloudinary');

const allBanners = async (req, res) => {
    try {
        const banners = await Banners.findAll();
        res.status(200).json({
            statusCode: 200,
            message: 'All banners success!',
            data: banners
        });
    } catch (error) {
        res.status(400).json({ 
            statusCode: 400,
            message: error.message 
        });
    }
}

const createBanner = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const url = result.secure_url;
        const cloudId = result.public_id;

        await Banners.create({
            url,
            CloudinaryId: cloudId
        })

        res.status(201).json({
            statusCode: 201,
            message: 'Create banner success!'
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        });
    }
}

const deleteBanner = async (req, res) => {
    try {
        const banner = await Banners.findOne({
            where: {
                id: req.params.id
            }
        })

        await cloudinary.uploader.destroy(banner.CloudinaryId);
        await banner.destroy();

        res.status(200).json({
            statusCode: 200,
            message: 'Delete banner success!'
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        });
    }
}

module.exports = { allBanners, createBanner, deleteBanner };