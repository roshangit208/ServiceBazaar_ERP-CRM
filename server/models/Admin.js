import mongoose from "mongoose"

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String
    },
    phone : {
        type: String
    } ,
    companyName: {
        type: String,
        required: true
    }
    ,
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', default: null },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin', 'super-admin', 'owner']
    },
    created: {
        type: Date,
        default: Date.now
    },
    enabled: {
        type: Boolean,
        default: true
    }
});




const Admin = mongoose.model('admin', AdminSchema);

export default Admin;