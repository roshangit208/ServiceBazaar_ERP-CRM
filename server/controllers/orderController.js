import Client from "../models/Client.js";
import Order from "../models/Order.js";
import Service from "../models/Service.js";

const addOrder = async (req, res) => {
    try {
        const { companyId } = req.user;
        const { clientId, serviceId, quantity } = req.body;
        const client = await Client.findOne({ _id: clientId });
        const service = await Service.findOne({ _id: serviceId });


        const orderAlreadyExist = await Order.findOne({ clientId: clientId, serviceId: serviceId });
        if (orderAlreadyExist) {
            throw new Error(" order Already Exist ");
        }
        else {
            const order = await Order.create({
                clientName: client.name,
                clientId: client._id,
                companyId: companyId,
                serviceName: service.name,
                serviceId: service._id,
                quantity: quantity,
                price: quantity * service.price
            });

            if (order) {

                res.status(200).json(order);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

const getOrders = async (req, res) => {
    try {
        const { companyId, _id, role } = req.user;
        if (role === "employee") {
            const services = await Service.find({ employeeId: _id });
            const orders = await Order.find({ companyId: companyId });
            var employeeOrders = [];
            services.forEach((service) => {
                const serviceOrders = orders.filter((order) => {
                    return order.serviceId.toString() === service._id.toString();
                });
                employeeOrders = [...employeeOrders, ...serviceOrders];
            });
            if (employeeOrders.length >= 0) {
                return res.status(200).json(employeeOrders);
            }
        }
        if (role === "client") {
            const orders = await Order.find({ clientId: _id });
            res.status(200).json(orders);
        }
        else {

            const orders = await Order.find({ companyId: companyId });
            res.status(200).json(orders);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal error');
    }
}

const updateOrder = async (req, res) => {
    try {
        const checkOrderPending = await Order.findOne({ _id: req.body._id });
        if (checkOrderPending.status === "Pending") {
            const { clientId, serviceId, quantity } = req.body;
            const service = await Service.findOne({ _id: serviceId });
            const client = await Client.findOne({ _id: clientId });
            const updateOrder = await Order.findByIdAndUpdate(req.body._id, {
                clientId: client._id,
                clientName: client.name,
                serviceId: service._id,
                serviceName: service.name,
                quantity: quantity,
                price: quantity * service.price
            })
            if (updateOrder) {
                res.status(200).json(updateOrder);
            }
        }
        else {
            throw new Error("order can't updated");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}

const changeStatus = async (req, res) => {
    try {
        const { _id, status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(_id, { status: status });
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        }

    } catch (err) {
        res.status(500).json('Internal error');
    }
}

const paymentStatus = async (req, res) => {
    try {
        const { _id, paymentStatus } = req.body;
        console.log(req.body);
        const updatedOrder = await Order.findByIdAndUpdate(_id, { paymentStatus: paymentStatus });
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        }

    } catch (err) {
        res.status(500).json('Internal error');
    }
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getDashData = async (req, res) => {
    try {
        const clients = await Client.find({});
        const orders = await Order.find({});

        // Helper function to initialize month data
        const initializeMonthData = () => {
            return monthNames.map((month, index) => ({
                client: 0,
                order: 0,
                month: month
            }));
        };

        // Initialize dataset
        const dataset = initializeMonthData();

        // Function to group data by month
        const groupByMonth = (data, key) => {
            data.forEach(item => {
                const monthIndex = new Date(item.created).getMonth();
                dataset[monthIndex][key]++;
            });
        };

        // Group clients and orders by month
        groupByMonth(clients, 'client');
        groupByMonth(orders, 'order');

        // Send the response
        res.status(200).json(dataset);
    } catch (err) {
        res.status(500).json(err);
    }
};


const getMonthlyStats = async (req, res) => {
    try {
        // Fetch all clients and orders
        const clients = await Client.find({});
        const orders = await Order.find({});

        // Initialize totals
        let totalOrderPrice = 0;
        let ordersThisMonth = 0;
        let clientsThisMonth = 0;

        // Get the current month and year
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Calculate total order price and orders this month
        orders.forEach(order => {
            totalOrderPrice += order.price; // Assuming each order has a 'price' field
            const orderDate = new Date(order.created);
            if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
                ordersThisMonth++;
            }
        });

        // Calculate clients this month
        clients.forEach(client => {
            const clientDate = new Date(client.created);
            if (clientDate.getMonth() === currentMonth && clientDate.getFullYear() === currentYear) {
                clientsThisMonth++;
            }
        });

        // Construct the response object
        const stats = {
            totalOrderPrice,
            ordersThisMonth,
            clientsThisMonth
        };

        // Send the response
        res.status(200).json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { addOrder, getOrders, updateOrder, changeStatus, paymentStatus, getDashData , getMonthlyStats };