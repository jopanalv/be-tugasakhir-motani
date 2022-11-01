const { Transactions, Profiles, Products } = require('../models');

const statusTrans = {
    Pending: 'pending',
    Approved: 'approved',
    Rejected: 'rejected',
    Cancelled: 'cancelled',
    Completed: 'completed'
}

const createTransaction = async (req, res) => {
    const BuyerId = req.user.id
    const { offer_price, start_rent, duration } = req.body
    const status = statusTrans.Pending
    const ProductId = req.params.id

    try {
        const buyer = await Profiles.findOne({
            where: {
                UserId: BuyerId
            }
        })

        const product = await Products.findOne({
            where: {
                id: ProductId
            }
        })

        if (buyer.address === null || buyer.phone === null) {
            res.status(400).json({
                statusCode: 400,
                message: 'Lengkapi profile terlebih dahulu!'
            })
        } else {
            const transaction = await Transactions.create({
                BuyerId,
                SellerId: product.ProfileId,
                ProductId,
                offer_price,
                start_rent,
                duration,
                status
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

module.exports = { createTransaction, acceptTransaction, rejectTransaction, cancelTransaction, completeTransaction }