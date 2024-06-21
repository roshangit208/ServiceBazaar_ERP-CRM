import Admin from "../models/Admin.js";
import Client from "../models/Client.js";
import bcrypt from "bcrypt"
import generateToken from "./generateToken.js";
import jwt from "jsonwebtoken"
import Employee from "../models/Employee.js";
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        const client = await Client.findOne({ email });
        const employee = await Employee.findOne({ email });
        if (admin) {
            const validPassword = await bcrypt.compare(password, admin.password);
            !validPassword && res.status(401).json({ message: "invalid password" });
            if (validPassword) {
                const token = generateToken(admin._id, admin.role);
                res.status(200).json({ role: admin.role, token: token, id: admin._id });
            }
        }
        else if (client) {
            const validPassword = await bcrypt.compare(password, client.password);
            !validPassword && res.status(401).json({ message: "invalid password" });
            if (validPassword) {
                const token = generateToken(client._id, client.role);
                res.status(200).json({ role: client.role, token: token, id: client._id });
            }
        }
        else if (employee) {
            const validPassword = await bcrypt.compare(password, employee.password);
            !validPassword && res.status(401).json({ message: "invalid password" });
            if (validPassword) {
                const token = generateToken(employee._id, employee.role);
                res.status(200).json({ role: employee.role, token: token, id: employee._id });
            }

        }
        else {
            res.status(404).json({ message: "user not found" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server error" });
    }
}

const getUser = async (req, res) => {
    try {
        const token = req.params.token;
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const admin = await Admin.findOne({ _id: decode.id }).select('-password -companyId');
        const client = await Client.findOne({ _id: decode.id }).select('-password -companyId');
        const employee = await Employee.findOne({ _id: decode.id }).select('-password -companyId');

        admin && res.status(200).json(admin);
        client && res.status(200).json(client);
        employee && res.status(200).json(employee);
        
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Error");
    }
}

export { Login, getUser };