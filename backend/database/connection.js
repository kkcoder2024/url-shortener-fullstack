import mongoose from "mongoose";
export async function databaseConnection(url) {
  mongoose.connect(url).then(() => console.log("MongoDB connected..."));
}
