import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true ,
        unique: true
    } , 
    price : {
        type : Number ,
        required : true
    } , 
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', default: null } , 
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', default: null } ,
    description : {
        type : String
    } ,
    created: {
        type: Date,
        default: Date.now
    }

});

const Service = mongoose.model('service',serviceSchema);

export default Service ;