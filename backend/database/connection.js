import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function databaseConnection() {
return mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error: ", err));
}
