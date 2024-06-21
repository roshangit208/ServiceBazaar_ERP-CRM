// controller for admin
import Admin from "../models/Admin.js";
import Client from "../models/Client.js";
import existence from "./existence.js";
import hashPassword from "./hashPassword.js";
import SendMail from "./sendMail.js";
import generateToken from "./generateToken.js";
import jwt from "jsonwebtoken"
import Employee from "../models/Employee.js";

function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

const registerAdmin = async (req, res) => {
    try {
        const { name, email, companyName, role, enabled, phone } = req.body;

        // const hashedPassword = await hashPassword(password);
        const exist = await existence(email)
        if (exist) {
            const admin = await Admin.create({
                name: name,
                email: email,
                phone: phone,
                companyName: companyName,
                role: role,
                enabled: enabled,
                password: generateRandomPassword()
            });

            if (admin) {
                await Admin.findByIdAndUpdate(admin._id, { companyId: admin._id });
                const token = generateToken(admin._id, admin.role);
                const url = `http://localhost:3000/verifymail/${token}`;
                const html = `
        <p style="font-size: 25px; font-weight: 600; color: black; ">Welcome ${admin.name}!</p> <br/>
        <p>Your verification link is <span style=" font-weight: 600; color: black; "> <a href="${url}"><button style="background-color: blue; color: white; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 7px;">Link</button></a>  </span></p> <br/>
        <p>I hope you enjoy using Service Bazaar. If you have any questions or feedback, please don't hesitate to reach us at <a href="mailto:contact@servicebazaar.com">contact@flashcubeit.com</a>.</p> <br/>
        <p>You can also reach out to us at: <a href="mailto:admin@servicebazaar.com">admin@servicebazaar.com</a> or you can call on +91 9953156485</p> <br/><br/>
        <p>Thank you,</p>
        <p>Service Bazaar</p>
        `;
                await SendMail(admin.email, html);
                res.status(200).json(admin);
            }
        } else {
            throw new Error("User Already Exist");
        }
    } catch (err) {
        err.message === "User Already Exist" ? res.status(409).json({ message: "User Already Exist" }) : res.status(500).json({ message: "Internal server error" });

    }
}

const AddAdmin = async (req, res) => {
    try {
        const { name, email, role, enabled, phone } = req.body;
        console.log(req.user);
        const { companyName, _id } = req.user;

        // const hashedPassword = await hashPassword(password);
        const exist = await existence(email)
        if (exist) {
            const admin = await Admin.create({
                name: name,
                email: email,
                phone: phone,
                companyName: companyName,
                role: role,
                enabled: enabled,
                companyId: _id,
                password: generateRandomPassword()
            });

            if (admin) {
                const token = generateToken(admin._id, admin.role);
                const url = `http://localhost:3000/verifymail/${token}`;
                const html = `
        <p style="font-size: 25px; font-weight: 600; color: black; ">Welcome ${admin.name}!</p> <br/>
        <p>Your verification link is <span style=" font-weight: 600; color: black; "><a href="${url}"><button style="background-color: blue; color: white; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 7px">Link</button></a></span></p> <br/>
        <p>I hope you enjoy using Service Bazaar. If you have any questions or feedback, please don't hesitate to reach us at <a href="mailto:contact@servicebazaar.com">contact@flashcubeit.com</a>.</p> <br/>
        <p>You can also reach out to us at: <a href="mailto:admin@servicebazaar.com">admin@servicebazaar.com</a> or you can call on +91 9953156485</p> <br/><br/>
        <p>Thank you,</p>
        <p>Service Bazaar</p>
        `;
                await SendMail(admin.email, html);
                res.status(200).json(admin);
            }
        } else {
            throw new Error("User Already Exist");
        }
    } catch (err) {
        console.log(err);
        err.message === "User Already Exist" ? res.status(409).json({ message: "User Already Exist" }) : res.status(500).json({ message: "Internal server error" });

    }
}

const getAdmins = async (req, res) => {
    try {
        const { companyId } = req.user;
        const admins = await Admin.find({ companyId: companyId});
        admins && res.status(200).json(admins);
    } catch (err) {
        res.status(500).json('Internal error');
    }
}

const updateAdmin = async (req, res) => {
    try {

        const updateAdmin = await Admin.findByIdAndUpdate(req.body._id, { $set: req.body });
        if (updateAdmin) {
            res.status(200).json(updateAdmin);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}

const enableAdmin = async (req, res) => {
    try {

        const authUser = req.user;
        const id = req.params.id;
       const admin = await Admin.findOne({ _id : id});

    //    case 1 owner can't be enabled or disabled
      if(admin._id.toString() === admin.companyId.toString())  throw new Error("enable error");
    //    case 2 you can't be enabled or disabled yourself
      else if (id == authUser._id)  throw new Error("enable error");
        else{
            const enabledadmin = await Admin.findByIdAndUpdate(id,{ enabled : !admin.enabled});
            res.status(200).json(enabledadmin);
        }

    } catch (err) {
        res.status(500).json("Internal error");
    }
}

const verifyMail = async (req, res) => {
    const token = req.params.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const admin = await Admin.findByIdAndUpdate(decoded.id, { emailVerified: true });
        const client = await Client.findByIdAndUpdate(decoded.id,{ emailVerified: true });
        const employee = await Employee.findByIdAndUpdate(decoded.id,{ emailVerified: true });
        res.status(200).json(decoded);

    } catch (err) {
        console.log(err);
        res.status(500).json("internal server error");
    }

}

const setPassword = async (req, res) => {
    try {
        const { id, password, cnfpassword } = req.body;
        if (password === cnfpassword) {
            const hash = await hashPassword(password);
            if (hash) {
                   await Admin.findByIdAndUpdate(id, { password: hash });
                   await Client.findByIdAndUpdate(id , {password: hash});
                   await Employee.findByIdAndUpdate(id , {password: hash});
                res.status(200).json({ message: "password set succesfully" });
            }
        }
        else {
            throw new Error("password mismatch");
        }
    }
    catch (err) {
        err.message === "password mismatch" ? res.status(405).json("password mismatch") : res.status(500).json("Internal Error");
    }
}



export { registerAdmin, verifyMail, setPassword, AddAdmin, getAdmins, updateAdmin , enableAdmin };