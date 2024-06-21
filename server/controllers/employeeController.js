import Employee from "../models/Employee.js";
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

const addEmployee = async (req, res) => {
    try {
        const { companyId } = req.user;
        const { name, email, phone } = req.body;
        const employeeAlreadyExist = await Employee.findOne({ email: email, companyId: companyId });
        if (employeeAlreadyExist) {
            throw new Error(" employeee Already Exist ");
        }
        else {
            const employee = await Employee.create({
                name: name,
                email: email,
                phone: phone,
                companyId: companyId,
                password : generateRandomPassword()
            });

            if (employee) {
                const token = generateToken(employee._id, employee.role);
                const url = `http://localhost:3000/verifymail/${token}`;
                const html = `
        <p style="font-size: 25px; font-weight: 600; color: black; ">Welcome ${employee.name}!</p> <br/>
        <p>Your verification link is <span style=" font-weight: 600; color: black; "><a href="${url}"><button style="background-color: blue; color: white; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 7px">Link</button></a></span></p> <br/>
        <p>I hope you enjoy using Service Bazaar. If you have any questions or feedback, please don't hesitate to reach us at <a href="mailto:contact@servicebazaar.com">contact@flashcubeit.com</a>.</p> <br/>
        <p>You can also reach out to us at: <a href="mailto:admin@servicebazaar.com">admin@servicebazaar.com</a> or you can call on +91 9953156485</p> <br/><br/>
        <p>Thank you,</p>
        <p>Service Bazaar</p>
        `;
                await SendMail(employee.email, html);
              res.status(200).json(employee);
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

const getEmployee = async (req, res) => {
    try {
        const { companyId } = req.user;
        const employees = await Employee.find({ companyId: companyId });
        employees && res.status(200).json(employees);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal error');
    }
}

const updateEmployee = async (req, res) => {
    try {

        const updateEmployee = await Employee.findByIdAndUpdate(req.body._id, { $set: req.body });
        if (updateEmployee) {
            res.status(200).json(updateEmployee);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}


export { addEmployee , getEmployee , updateEmployee } ;