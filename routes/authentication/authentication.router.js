const express = require("express");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

//# Importing User Model
const userModelInstance = require("../database/models/user");
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
                res.render("signin", { error: "User Doesn't Exist !!!" });
                return;
            }

            var hashedPassword = user.password;
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(
                enteredPassword,
                hashedPassword
            );
            if (!validPassword) {
                res.render("signin", { error: "Incorrect Email/Password !!!" });
                return;
            } else {
                req.session.isLoggedIn = true;
                req.session.user = user;

                res.send(200).json({
                    message: "Successfully Logged In !!!",
                    user: user,
                });
            }
        })
        .catch(function (err) {
            console.log(err);
            res.send(400).json({
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
        res.render("signup", { error: "Please Enter Username" });
    }

    if (!email) {
        res.render("signup", { error: "Please Enter Email" });
    }

    if (!password) {
        res.render("signup", { error: "Please Enter Password" });
    }

    if (!confirmPassword) {
        res.render("signup", { error: "Please Enter Confirm Password" });
    }

    if (password !== confirmPassword) {
        res.render("signup", { error: "Passwords Don't Match" });
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
                    })
                    .catch(function (err) {
                        console.log(err);
                        res.render("signup", {
                            error: "Error Occured While Signing Up !!!",
                        });
                    });
            }
        })
        .catch(function (err) {
            console.log(
                "Error Occured While Searching For User in DB During SignUp !!!",
                err
            );
            res.send(400).json({
                message: "Error Occurred In Logging In !!!",
                error: err,
            });
        });
});

//! Sign Out
authRouter.get("/signout", function (req, res) {
    req.session.destroy();
    console.log("Successfully Logged Out !!!");
    res.send(200).json({
        message: "Successfully Logged Out !!!",
    });
});

module.exports = authRouter;
