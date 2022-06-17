const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const { encryptSHA256 } = require("../auth");
const User = require("../models/user");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

exports.checkLogin = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email, password: encryptSHA256(password) });

    if (!!user) {
        const token = jwt.sign({ ...user, sub: user.id }, TOKEN_SECRET);
        const userId = user.id;
        res.json({
            userId,
            token,
            sucess: true,
            error: false,
        });
    } else {
        res.status(401).json({ error: "Email or password is invalid." });
    }

};

exports.create = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const userEmail = await User.findOne({
        where: { email }
    });

    if (userEmail) {
        return res.status(401).json({ error: "Email is invalid or already taken." })
    } else {
        user = req.body;
        return User.create({
            name: user.name,
            email: user.email,
            password: encryptSHA256(user.password),
            location: user.location
        })
            .then((user) => {
                return res.status(201).send({
                    message: 'Book uploaded successfully',
                    user
                });
            })
            .catch(error => res.status(500).send(error));
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params
        const { oldPassword, newPassword } = req.body;

        console.log(encryptSHA256(oldPassword));

        const user = await User.updateOne(
            //filter
            { _id: id, password: encryptSHA256(oldPassword) },
            //changed value
            { password: encryptSHA256(newPassword) });

        console.log(user);
        if (!!user.modifiedCount <= 0) {
            res.status(400).json({ error: "Old password is invalid." })
        }
        else {
            return res.status(200).json({ status: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.deleteOne({
            where: {
                id,
            },
        });

        res.json({ success: !!deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
