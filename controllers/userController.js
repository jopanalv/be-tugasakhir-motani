const { Users, Profiles } = require('../models');
const cloudinary = require('../utils/cloudinary');

const getAllUser = async (req, res) => {
    try {
        const users = await Users.findAll({
            include: {
                model: Profiles,
                required: true
            }
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Get all user success!',
            data: users
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            include: {
                model: Profiles,
                required: true
            },
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Get user success!',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    const { name, address, city, phone } = req.body;

    try {
        const profile = await Profiles.findOne({
            where: {
                UserId: req.params.id
            }
        })

        if (profile.CloudinaryId) {
            await cloudinary.uploader.destroy(profile.CloudinaryId)
        }
        
        const result = await cloudinary.uploader.upload(req.file.path)
        const image = result.secure_url
        const cloudId = result.public_id

        await profile.update({
            name,
            address,
            city,
            phone,
            photo: image,
            CloudinaryId: cloudId
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Update profile success!'
        })
    } catch (error) {
        res.status(403).json({
            statusCode: 403,
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const profile = await Profiles.findOne({
            where: {
                UserId: req.params.id
            }
        })

        await Users.destroy({
            where: {
                id: req.params.id
            }
        })

        await Profiles.destroy({
            where: {
                UserId: req.params.id
            }
        })

        await cloudinary.uploader.destroy(profile.CloudinaryId)

        res.status(200).json({
            statusCode: 200,
            message: 'Delete user success!'
        })
    } catch (error) {
        res.status(403).json({
            statusCode: 403,
            message: error.message
        })
    }
}

module.exports = { getAllUser, getUser, updateUser, deleteUser }