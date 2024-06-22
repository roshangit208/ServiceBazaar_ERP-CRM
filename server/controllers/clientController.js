import Client from "../models/Client.js";
import generateToken from "./generateToken.js";
import SendMail from "./sendMail.js";


function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

const addClient = async (req, res) => {
    try {
        const { companyId } = req.user;
        const { name, email, phone } = req.body;
        const clientAlreadyExist = await Client.findOne({ email: email, companyId: companyId });
        if (clientAlreadyExist) {
            throw new Error(" Client Already Exist ");
        }
        else {
            const client = await Client.create({
                name: name,
                email: email,
                phone: phone,
                companyId: companyId,
                password : generateRandomPassword()
            });

            if (client) {
                const token = generateToken(client._id, client.role);
                const url = `https://servicebazaar-erp-crm-frontend.onrender.com/verifymail/${token}`;
                const html = `
        <p style="font-size: 25px; font-weight: 600; color: black; ">Welcome ${client.name}!</p> <br/>
        <p>Your verification link is  <span style=" font-weight: 600; color: black; "><a href="${url}"><button style="background-color: blue; color: white; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer;border-radius: 7px">Link</button></a></span></p> <br/>
        <p>I hope you enjoy using Service Bazaar. If you have any questions or feedback, please don't hesitate to reach us at <a href="mailto:contact@servicebazaar.com">contact@flashcubeit.com</a>.</p> <br/>
        <p>You can also reach out to us at: <a href="mailto:admin@servicebazaar.com">admin@servicebazaar.com</a> or you can call on +91 9953156485</p> <br/><br/>
        <p>Thank you,</p>
        <p>Service Bazaar</p>
        `;
                await SendMail(client.email, html);
              res.status(200).json(client);
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

const getClients = async (req, res) => {
    try {
        const { companyId } = req.user;
        const clients = await Client.find({ companyId: companyId });
        clients && res.status(200).json(clients);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal error');
    }
}

const updateClient = async (req, res) => {
    try {

        const updateClient = await Client.findByIdAndUpdate(req.body._id, { $set: req.body });
        if (updateClient) {
            res.status(200).json(updateClient);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}


export { addClient , getClients , updateClient } ;