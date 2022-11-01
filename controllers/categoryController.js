const { Categories } = require('../models');

const allCategories = async (req, res) => {
    try {
        const category = await Categories.findAll();
        
        res.status(200).json({
            statusCode: 200,
            message: 'Get all categories success!',
            data: category
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
    }
}

const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        await Categories.create({
            name
        })
        
        res.status(200).json({
            statusCode: 200,
            message: 'Create category success!',
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const { name } = req.body
        await Categories.update({
            name
        }, {
            where: {
                id: req.params.id
            }
        })
        
        res.status(200).json({
            statusCode: 200,
            message: 'Update category success!',
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        await Categories.destroy({
            where: {
                id: req.params.id
            }
        })
        
        res.status(200).json({
            statusCode: 200,
            message: 'Delete category success!',
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
    }
}

module.exports = { allCategories, createCategory, updateCategory, deleteCategory }