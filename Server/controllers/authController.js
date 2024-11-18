require("dotenv").config();
const User = require("../model/user");
const hashPassword = require("../utils/hashing");
const Joi = require('joi');
const DuplicateValueError = require('../services/errors.js');
const jwt = require("jsonwebtoken");
const UserDto = require("../utils/userDTO.js");
const RefreshToken = require("../model/refreshtoken.js");
const bcrypt = require('bcrypt');


const authController = {
    async signup(req, res, next) {
        console.log(req.body);
        try {
            // Password and email regex patterns
            const userSignUpSchema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(20).required()
                    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
                    .message('Password must include uppercase, lowercase, number, and special character.'),
                name: Joi.string().min(5).max(30).required(),
                username: Joi.string().min(8).max(25).required(),
            });


            const { error } = userSignUpSchema.validate(req.body);
            if (error) {
                // Joi validation error
                return next(error);
            }

            const { email, password, name, username } = req.body;

            // Check if email already exists
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                console.log('Email already exists');
                throw new DuplicateValueError('Email already exists');
            }

            // Check if username already exists
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
                console.log('Username already exists');
                throw new DuplicateValueError('Username already exists');
            }

            // Hash password
            const securedPassword = await hashPassword(password);

            // Create new user
            const user = await User.create({
                name,
                username,
                email,
                password: securedPassword,
            });

            // generating a json webtonken

            let accessToken;
            let refreshToken;
            try {
                if (!process.env.ATSK || !process.env.RTSK) {
                    throw new Error('ACCESS AND REFRESH TOKEN must have a value');
                }
                accessToken = await jwt.sign({ id: user._id }, process.env.ATSK, { expiresIn: '1d' });
                refreshToken = await jwt.sign({ id: user._id }, process.env.RTSK, { expiresIn: '7d' });
            }
            catch (error) {
                return next(error);
            }

            // sending the tokens in the cookie
            //! ___________________________sending jwt and refresh token to the client__________________________
            res.cookie("accessToken", accessToken, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true

            })
            //! ___________________________sending jwt and refresh token to the client__________________________
            res.cookie("refreshToken", refreshToken, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true

            })


            //!_____________ saving the refresh token in the database
            await RefreshToken.create({ refreshToken, userRef: user._id });

            // sending the required data 
            const userDto = new UserDto(user);

            // Send success response
            return res.status(201).json({
                message: 'User created successfully',
                user: userDto
            });

        } catch (error) {
            // Pass errors to the error handler middleware
            return next(error);
        }
    },

    async login(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            const error = {
                message: 'Email and password are required',
                status: 400
            }
            return next(error);
        }
        const userLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        const { error } = userLoginSchema.validate(req.body);
        if (error) {
            // Joi validation error
            return next(error);
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                const error = {
                    message: 'User not found',
                    status: 404
                }
                return next(error);
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                const error = {
                    message: 'Incorrect password',
                    status: 401
                }
                return next(error);
            }
            const accessToken = await jwt.sign({ id: user._id }, process.env.ATSK, { expiresIn: '1d' });
            const refreshToken = await jwt.sign({ id: user._id }, process.env.RTSK, { expiresIn: '7d' });
            //! ___________________________sending jwt and refresh token to the client__________________________
            res.cookie("accessToken", accessToken, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true

            })
            //! ___________________________sending jwt and refresh token to the client__________________________
            res.cookie("refreshToken", refreshToken, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true

            })

            try {
                await RefreshToken.findOneAndDelete({ userRef: user._id });
                await RefreshToken.create({ refreshToken, userRef: user._id });
            } catch (error) {
                return next(error);
            }

            const userDto = new UserDto(user);
            return res.status(200).json({
                message: 'User logged in successfully',
                user: userDto,
                isAuthenticated: true
            });
        }
        catch (error) {
            return next(error);
        }









    },

    async logout(req, res) {
        // Implementation here

        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(400).json({ message: 'No refresh token provided' });
            }
            await RefreshToken.findOneAndDelete({ refreshToken });
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            return next(error);
        }


    },

    async refresh(req, res) {
        // Implementation here
    },
};

module.exports = authController;
