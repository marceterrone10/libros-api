import mongoose from "mongoose";
import config from "../config/environments.js";

const { database } = config;

export async function connection() {
    try {
        await mongoose.connect(database.mongoURI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};