import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'client', default: null },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', default: null },
    serviceName: {
        type: String,
        required: true
    },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'service', default: null },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'In-process', 'Fulfilled']
    },
    paymentStatus: {
        type: String,
        default: 'Unpaid',
        enum: ['Unpaid', 'Paid']
    },
    created: {
        type: Date,
        default: Date.now
    }

});

const Order = mongoose.model('order',orderSchema);

export default Order;