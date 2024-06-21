import express from "express";
import initDb from "./config/db.js";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js"
import clientRoute from "./routes/clientRoute.js"
import employeeRoute from "./routes/employeeRoute.js"
import serviceRoute from "./routes/serviceRoute.js"
import orderRoute from "./routes/orderRoute.js"
import cors from 'cors';
dotenv.config();

const app = express();
// function  for database connection
initDb();
app.use(express.json());
app.use(cors());

// route for authentication
app.use("/api/auth", authRoute);
// other routes 
app.use("/api", clientRoute);
app.use("/api", employeeRoute);
app.use("/api", serviceRoute);
app.use("/api", orderRoute);

app.listen(8000, () => {
    console.log("server is running on port 8000");
});

