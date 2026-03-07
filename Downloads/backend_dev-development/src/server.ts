import {Server} from "http";
import mongoose from "mongoose";



import app from "./app.js";
import { envVars } from "./app/modules/config/env.js";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin.js";

let server: Server;

const startServer = async () => {
    try {

        await mongoose.connect(envVars.DB_URL)

        console.log("Connected to MongoDB");

        server= app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
        
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

(async () => {
        await startServer();
    await seedSuperAdmin();

})();

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection:", err);
    if(server){
        server.close(() => {
            process.exit(1);
        }); 
    }
});

//Promise.reject(new Error("Test unhandled rejection"));


process.on("uncaughtException", (err) => {
    console.log("Unhandled Exception at:", err);
    if(server){
        server.close(() => {
            process.exit(1);
        }); 
    } });



    
process.on("SIGTERM", (err) => {
    console.log("SIGTERM received:", err);
    if(server){
        server.close(() => {
            process.exit(1);
        }); 
    } });

//Promise.reject(new Error("Test unhandled rejection"));

//Promise.reject(new Error("Test unhandled rejection"));

//throw new Error("Test unhandled exception");



//mongodb+srv://admin:vrkmelkCi4BqXBgs@cluster0.vm27qzt.mongodb.net/?appName=Cluster0
