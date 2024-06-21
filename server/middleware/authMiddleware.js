import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Employee from "../models/Employee.js"
import Client from "../models/Client.js";

const adminProtected = async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decode.role === "admin" || decode.role === "owner" || decode.role === "super-admin") {
                req.user = await Admin.findById(decode.id);
                next()
            } else {
                res.status(401).json({ message: "user is not authorized" });
            }

        } catch (err) {
            res.status(401).json({ message: "user is not authorized" });
        }
    }
    else {
        res.status(401).json({ message: "login with your account" });
    }

}

const superAdminProtected = async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decode.role === "super-admin") {
                req.user = await Admin.findById(decode.id);
                next()
            } else {
                res.status(401).json({ message: "user is not authorized" });
            }

        } catch (err) {
            res.status(401).json({ message: "user is not authorized" });
        }
    }
    else {
        res.status(401).json({ message: "login with your account" });
    }

}

const ownerProtected = async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decode.role === "owner") {
                req.user = await Admin.findById(decode.id);
                next()
            } else {
                res.status(401).json({ message: "user is not authorized" });
            }

        } catch (err) {
            console.log(err);
            res.status(401).json({ message: "user is not authorized" });
        }
    }
    else {
        res.status(401).json({ message: "login with your account" });
    }

}

const employeeProtected = async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decode.role === "owner" || decode.role === "admin" || decode.role === "super-admin") {
                req.user = await Admin.findById(decode.id);
                next()
            }
            else if (decode.role === "employee") {
                req.user = await Employee.findById(decode.id);
                next()
            }
            else {

                res.status(401).json({ message: "user is not authorized" });
            }

        } catch (err) {
            console.log(err);
            res.status(401).json({ message: "user is not authorized" });
        }
    }
    else {
        res.status(401).json({ message: "login with your account" });
    }

}

const clientProtected = async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decode.role === "owner" || decode.role === "admin" || decode.role === "super-admin") {
                req.user = await Admin.findById(decode.id);
                next()
            }
            else if (decode.role === "employee") {
                req.user = await Employee.findById(decode.id);
                next()
            }
            else if (decode.role === "client") {
                req.user = await Client.findById(decode.id);
                next()
            }
            else {

                res.status(401).json({ message: "user is not authorized" });
            }

        } catch (err) {
            console.log(err);
            res.status(401).json({ message: "user is not authorized" });
        }
    }
    else {
        res.status(401).json({ message: "login with your account" });
    }

}

export { adminProtected, superAdminProtected, ownerProtected , employeeProtected , clientProtected }