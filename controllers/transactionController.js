const { Transactions, Profiles, Products, Categories } = require('../models');
const cloudinary = require('../utils/cloudinary');

const statusTrans = {
    Pending: 'pending',
    Approved: 'approved',
    Rejected: 'rejected',
    Cancelled: 'cancelled',
    Completed: 'completed'
}

const getAllTransaction = async (req, res) => {
    try {
        const transactions = await Transactions.findAll({
            include: [
                {
                    model: Products,
                    required: true,
                    include: {
                        model: Categories,
                        required: true,
                        attributes: ['name']
                    }
                },
                {
                    model: Profiles,
                    required: true,
                }
            ]
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Get all transactions success!',
            data: transactions
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const getTransaction = async (req, res) => {
    const { id } = req.params

    try {
        const transaction = await Transactions.findOne({
            include: [
                {
                    model: Products,
                    required: true,
                    include: {
                        model: Categories,
                        required: true,
                        attributes: ['name']
                    }
                },
                {
                    model: Profiles,
                    required: true,
                }
            ],
            where: {
                id
            }
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Get transaction success!',
            data: transaction
        })
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const createTransaction = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path)
    const { buyerId, offer_price, start_rent, duration } = req.body
    const ktp = result.secure_url
    const cloudId = result.public_id
    const status = statusTrans.Pending

    try {
        const buyer = await Profiles.findOne({
            where: {
                UserId: buyerId
            }
        })

        const product = await Products.findOne({
            where: {
                slug: req.params.slug
            }
        })

        if (buyer.address === null || buyer.phone === null) {
            res.status(400).json({
                statusCode: 400,
                message: 'Lengkapi profile terlebih dahulu!'
            })
        } else {
            const transaction = await Transactions.create({
                ProfileId: buyer.id,
                SellerId: product.ProfileId,
                ProductId: product.id,
                offer_price,
                start_rent,
                duration,
                ktp,
                status,
                CloudinaryId: cloudId
            })

            res.status(201).json({
                statusCode: 201,
                message: 'Transaksi berhasil dibuat!',
                data: transaction
            })
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const acceptTransaction = async (req, res) => {
    const { id } = req.params

    try {
        const transaction = await Transactions.findOne({
            where: {
                id: id
            }
        })

        await transaction.update({
            status: statusTrans.Approved
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Transaksi berhasil disetujui!',
            data: transaction
        })
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const rejectTransaction = async (req, res) => {
    const { id } = req.params

    try {
        const transaction = await Transactions.findOne({
            where: {
                id: id
            }
        })

        await transaction.update({
            status: statusTrans.Rejected
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Transaksi berhasil ditolak!',
            data: transaction
        })
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const cancelTransaction = async (req, res) => {
    const { id } = req.params

    try {
        const transaction = await Transactions.findOne({
            where: {
                id: id
            }
        })

        await transaction.update({
            status: statusTrans.Cancelled
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Transaksi berhasil dibatalkan!',
            data: transaction
        })
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const completeTransaction = async (req, res) => {
    const { id } = req.params

    try {
        const transaction = await Transactions.findOne({
            where: {
                id: id
            }
        })

        await transaction.update({
            status: statusTrans.Completed
        })

        res.status(200).json({
            statusCode: 200,
            message: 'Transaksi berhasil diselesaikan!',
            data: transaction
        })
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

module.exports = { getAllTransaction, getTransaction, createTransaction, acceptTransaction, rejectTransaction, cancelTransaction, completeTransaction }