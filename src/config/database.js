const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://dinesh:1uxgVvmvATpF5IKs@cluster0.su4nq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
};

module.exports = { connectDB };