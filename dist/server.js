"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || "5001";
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://sheenalouise3_db_user:UH9z0LQbtxzNvmcl@cluster0.mnxwpta.mongodb.net/?appName=Cluster0";
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
