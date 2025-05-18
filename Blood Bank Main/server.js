// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// Load environment variables from the .env file
dotenv.config();

// Create Express app
const app = express();

// MongoDB connection
const connectDB = async () => {
    try {
        // Use the MongoDB URI from the environment variables
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            console.error("MongoDB URI not found in environment variables.");
            return;
        }

        // Connect to MongoDB using Mongoose
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("MongoDB connected successfully".green);
    } catch (error) {
        console.error("MongoDB connection error:", error.message.red);
        process.exit(1); // Exit process with failure
    }
};

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());               // Enable CORS
app.use(express.json());       // Parse incoming JSON requests
app.use(morgan("dev"));        // HTTP request logger

// Route Definitions
app.use("/api/v1/test", require("./routes/testRroute.js"));
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes.js"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes.js"));
app.use("/api/v1/admin", require("./routes/adminRoutes.js"));

// Server Configuration
const PORT = process.env.PORT || 5000;       // Port from environment or default to 5000
const MODE = process.env.DEV_MODE || "production";  // Development mode or default to production

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${MODE} mode on http://localhost:${PORT}`.bgBlue.white);
});
