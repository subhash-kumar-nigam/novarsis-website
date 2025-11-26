const User = require('../models/users.model');
const cache = require('../utils/cache');
const jwtConfig = require('../config/jwt');
const jwt = require('../utils/jwt');
const bcrypt = require('bcryptjs');
const random = require('../common/index')
const { Op } = require("sequelize");
const {isValidMobileNumber, isValidEmail} = require('../common');

exports.register = async (req, res) => {
    let isExist
    const email = req.body.email.trim().toLowerCase();
    let isNumber = isNaN(email)
    if (isNumber) {
        if(isValidEmail(email)){
            isExist = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
        }else{
            return res.status(400).json({ message: 'Invalid email/mobile' });
        }


    } else {
        if(isValidMobileNumber(email)){
            isExist = await User.findOne({
                where: {
                    mobile: req.body.email
                }
            })
        }else{
            return res.status(400).json({ message: 'Invalid mobile/email' });
        }
    }
    if (isExist) {
        return res.status(400).json({ message: 'Email/Mobile already exists.' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let insertObj = {
        firstName: req.body.firstName.trim().toLowerCase(),
        password: hashedPassword,
        uniqueID: random.rendomString()
    }
    insertObj[isNumber ? "email" : "mobile"] = req.body.email
    const user = await User.create(insertObj);
    const token = await jwt.createToken({ id: user.id });
    rtnObj = {
        "name":`${user.firstName} ${user.lastName}`,
        access_token : token,
        id: user.uniqueID,
        token_type: 'Bearer',
        message: 'User created',
        expires_in: jwtConfig.ttl
    }
    return res.json(rtnObj);
}

exports.login = async (req, res) => {
    const user = await User.findOne({
        where: {
            [Op.or]: [
              { email: req.body.email },
              { mobile: req.body.email },
            ]
          }
    });
    if (user) {
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if (isMatched) {
            const token = await jwt.createToken({ id: user.id });
            return res.json({
                id: user.uniqueID,
                name: user.firstName,
                access_token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl
            });
        }
    }
    return res.status(400).json({ message: 'Unauthorized' });
}

exports.getUser = async (req, res) => {
    const user = await User.findByPk(1);
    return res.json(user);
}

exports.logout = async (req, res) => {
    const token = req.body.token;
    const now = new Date();
    const expire = new Date(req.body.user.exp);
    const milliseconds = now.getTime() - expire.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    await cache.set(token, token, milliseconds);
    return res.json({ message: 'Logged out successfully' });
}

exports.userSerach = async (req,res)=>{
    const search = req.query.search
    const userId = req.query.userId
    let users = await User.findAll({
        raw: true,
        where: {
            firstName: {
                [Op.like]: `%${search}%`,
            },
            [Op.not]:[{
                uniqueID:[userId]
            }]
        },
        order: [
            ['id', 'DESC'],
        ],
        }
    )
    return res.json(users);
}