const { Products, Profiles, Categories } = require('../models');
const cloudinary = require('../utils/cloudinary');

const getAllProduct = async (req, res) => {
    try {
        const products = await Products.findAll({
            include: {
                model: Categories,
                required: true,
                attributes: ['name']
            }
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Get all products success!',
            data: products
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const products = await Products.findOne({
            include: {
                model: Categories,
                required: true,
                attributes: ['name']
            },
            where: {
                slug: req.params.slug
            }
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Get products success!',
            data: products
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
    }
}

const createProduct = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const { name, description, price, CategoryId, stock } = req.body
        const userId = req.user.id
        const image = result.secure_url
        const cloudId = result.public_id

        const profile = await Profiles.findOne({
            where: {
                UserId: userId
            }
        })
        const profileId = profile.id

        await Products.create({
            ProfileId: profileId,
            name,
            slug: name.toLowerCase().split(' ').join('-'),
            description,
            CategoryId,
            price,
            stock,
            image,
            CloudinaryId: cloudId,
            isAvailable: true
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

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock, CategoryId } = req.body
        const product = await Products.findOne({
            where: {
                slug: req.params.slug
            }
        })

        await cloudinary.uploader.destroy(product.CloudinaryId)
        const result = await cloudinary.uploader.upload(req.file.path)
        const image = result.secure_url
        const cloudId = result.public_id

        await product.update({
            name,
            slug: name.toLowerCase().split(' ').join('-'),
            description,
            CategoryId,
            price,
            stock,
            image,
            CloudinaryId: cloudId
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Update product success!'
        })
    } catch (error) {
        res.status(403).json({
            statusCode: 403,
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                id: req.params.slug
            }
        })

        await cloudinary.uploader.destroy(product.CloudinaryId)

        await Products.destroy({
            where: {
                slug: product.slug
            }
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Delete product success!'
        })
    } catch (error) {
        res.status(403).json({
            statusCode: 403,
            message: error.message
        })
    }
}

module.exports = { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct }