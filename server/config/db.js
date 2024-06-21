import mongoose from "mongoose";

const initDb = () => {
    if (mongoose.connections[0].readyState) {
        console.log("connection already exist");
        return;
    }

    mongoose.connect(process.env.DATABASE_URI, {});

    mongoose.connection.on('connected', () => {
        console.log('connected to a mongoDb')
    })
    mongoose.connection.on('error', () => {
        console.log('error when u are trying to connect with mongodb')
    })


}


export default initDb;