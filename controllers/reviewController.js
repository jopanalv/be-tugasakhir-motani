const { Review, Products, Profiles } = require('../models');

const createReview = async (req, res) => {
    const { ProductId, rate, comment } = req.body
    const id = req.user.id
    try {
        const review = await Review.create({
            ProfileId: id,
            ProductId,
            rate,
            comment
        })

        res.status(201).json({
            statusCode: 201,
            message: 'Success create comment',
            data: review
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
    }
}

const getAllReviewById = async (req, res) => {
    const { id } = req.params
    try {
        const review = await Review.findAll({
            where: {
                ProductId: id
            },
            include: [
                {
                    model: Profiles,
                    require: true
                },
                {
                    model: Products,
                    require: true
                }
            ]
        })
        
        res.status(200).json({
            statusCode: 200,
            message: 'Success get all review',
            data: review
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error.message
        })
    }
}

module.exports = { createReview, getAllReviewById }