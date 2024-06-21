import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
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
    phone: {
        type: String
    },
    orders:
    {
        type: Array,
        default: []
    },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', default: null } ,
    role : {
      type : String ,
      default:'client'
    } ,
    created: {
        type: Date,
        default: Date.now
    }
});

const Client = mongoose.model('client',clientSchema);
export default Client;