const { isFormEmpty } = require('../utils/isFormEmpty');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users, Profiles } = require('../models');

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        if (isFormEmpty(req.body)) {
            res.status(400).json({
                statusCode: 400,
                message: 'Form cannot be empty!'
            })
        } else {
            const emailRegistered = await isEmailRegistered(email);

            if (!emailRegistered) {
                const user = await Users.create({
                    email: email,
                    password: hashPassword,
                    role: role
                })

                await Profiles.create({
                    UserId: user.id,
                    name: name
                })

                res.status(201).json({
                    statusCode: 201,
                    message: 'Register success!',
                    data: user
                })
            } else {
                res.status(400).json({
                    statusCode: 400,
                    message: 'Email already exist!'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (isFormEmpty(req.body)) {
            res.status(400).json({
                statusCode: 400,
                message: 'Form cannot be empty!'
            })
        } else {
            const userInfo = await isEmailRegistered(email);
            const passwordMatch = await bcrypt.compare(password, userInfo.password);

            if (!passwordMatch) {
                res.status(401).json({
                    statusCode: 401,
                    message: 'Email or Password doesnt match!'
                })
            } else {
                const user = { id: userInfo.id, email: userInfo.email, role: userInfo.role };

                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
                // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })

                res.status(200).json({
                    statusCode: 200,
                    message: 'Login success!',
                    accessToken: accessToken
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: 'Email is not registered!'
        })
    }
}

const logout = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            res.status(400).json({
                statusCode: 400,
                message: 'Login first!'
            })
        }

        res.clearCookie('accessToken');
        res.status(200).json({
            statusCode: 200,
            message: 'Logout success!'
        })
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const isEmailRegistered = (value) => {
    return Users.findOne({
        where: {
            email: value
        }
    })
}

module.exports = {
    register,
    login,
    logout
}