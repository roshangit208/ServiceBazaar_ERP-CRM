import Service from "../models/Service.js";



const addService = async (req, res) => {
    try {
        const { companyId } = req.user;
        const { name, price, description, employeeId } = req.body;
        const serviceAlreadyExist = await Service.findOne({ name: name, employeeId: employeeId });
        if (serviceAlreadyExist) {
            throw new Error(" service Already Exist ");
        }
        else {
            const service = await Service.create({
                name: name,
                price: price,
                description: description,
                companyId: companyId,
                employeeId: employeeId
            });

            if (service) {

                res.status(200).json(service);
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

const getServices = async (req, res) => {
    try {
        const { companyId, _id, role } = req.user;
        if (role === "employee") {
            const services = await Service.find({ employeeId: _id });
            res.status(200).json(services);
        }
        else {

            const services = await Service.find({ companyId: companyId });
            res.status(200).json(services);

        }

    } catch (err) {
        console.log(err);
        res.status(500).json('Internal error');
    }
}

const updateService = async (req, res) => {
    try {

        const updateService = await Service.findByIdAndUpdate(req.body._id, { $set: req.body });
        if (updateService) {
            res.status(200).json(updateService);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}


export { addService, getServices, updateService };