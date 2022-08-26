const { Products, Profiles, Categories } = require('../models');
const cloudinary = require('../utils/cloudinary');

const createProduct = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const { name, description, price, CategoryId } = req.body
    const userId = req.user.id
    const image = result.secure_url
    const cloudId = result.public_id

    try {
        const profile = await Profiles.findOne({
            where: {
                UserId: userId
            }
        })
        const profileId = profile.id

        await Products.create({
            ProfileId: profileId,
            name,
            description,
            CategoryId,
            price,
            image,
            CloudinaryId: cloudId
        })

        res.status(201).json({
            statusCode: 201,
            message: 'Create product success!',
        })
    } catch (error) {
        res.status(403).json({
            statusCode: 403,
            message: error.message
        })
    }
}

module.exports = { createProduct }