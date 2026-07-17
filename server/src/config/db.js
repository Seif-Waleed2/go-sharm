const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the URI defined in environment variables.
 * Exits the process on failure since the app cannot run without a DB.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/go-sharm";
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;