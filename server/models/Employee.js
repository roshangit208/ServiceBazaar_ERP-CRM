import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
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
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', default: null },
    role : {
      type : String ,
      default:'employee'
    } , 
    created: {
        type: Date,
        default: Date.now
    }

});


const Employee = mongoose.model('employee',employeeSchema);

export default Employee;