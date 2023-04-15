const express = require("express");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

//# Importing User Model
const userModelInstance = require("../../database/models/user.model");
const userModel = userModelInstance.model;
const userTypeEnums = userModelInstance.userRoleEnums;

//! Sign In
authRouter.post("/signin", function (req, res) {
    const email = req.body.email;
    const enteredPassword = req.body.password;

    userModel
        .findOne({ email: email })
        .then(async function (user) {
            //* check if user exists
            if (!user) {
                return res.status(400).json({
                    message: "User doesn't exist !!!",
                });
            }

            var hashedPassword = user.password;
            //* check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(
                enteredPassword,
                hashedPassword
            );
            if (!validPassword) {
                return res.status(400).json({
                    message: "Wrong Email/Password !!!",
                });
            } else {
                // req.session.isLoggedIn = true;
                // req.session.user = user;

                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    confirmPassword: "",
                });
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).json({
                message: "Error Occurred In Logging In !!!",
                error: err,
            });
        });
});

//! Sign Up
authRouter.post("/signup", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (!name) {
        return res.status(400).json({
            message: "Please Enter Username",
        });
    }

    if (!email) {
        return res.status(400).json({
            message: "Please Enter Email",
        });
    }

    if (!password) {
        return res.status(400).json({
            message: "Please Enter Password",
        });
    }

    if (!confirmPassword) {
        return res.status(400).json({
            message: "Please Enter Confirm Password",
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords Don't Match",
        });
    }

    userModel
        .findOne({ email: email })
        .then(async function (user) {
            if (user) {
                return res.status(400).json({
                    message: "Email Id already exists !!!",
                });
            } else {
                //* if user doesn't already exists in DB, create new user, but we hash the password before storing it in DB

                // generate salt to hash password
                const salt = await bcrypt.genSalt(10);

                // now we set user password to hashed password
                var hashedPassword = await bcrypt.hash(password, salt);

                userModel
                    .create({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        userType: userTypeEnums.customer,
                    })
                    .then(function (user) {
                        console.log("new user", user);
                        return res.status(200).json({
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            password: user.password,
                            confirmPassword: "",
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: "Error Occured While Signing Up !!!",
                        });
                    });
            }
        })
        .catch(function (err) {
            console.log(
                "Error Occured While Searching For User in DB During SignUp !!!",
                err
            );
            res.status(400).json({
                message: "Error Occurred In Logging In !!!",
                error: err,
            });
        });
});

//! Sign Out
authRouter.get("/signout", function (req, res) {
    // req.session.destroy();
    console.log("Successfully Logged Out !!!");
    res.status(200).json({
        message: "Successfully Logged Out !!!",
    });
});

module.exports = authRouter;
