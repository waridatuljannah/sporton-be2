import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT  || "5001";
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://sheenalouise3_db_user:UH9z0LQbtxzNvmcl@cluster0.mnxwpta.mongodb.net/?appName=Cluster0";


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });