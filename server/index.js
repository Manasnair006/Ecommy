const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
require("dotenv").config();

const connectDB = require("./config/mongodb");
const cacheWarmer = require("./services/cacheWarmer");
const auth = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;

connectDB();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (e.g. mobile apps, curl, Postman) or explicit allowed origins
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            // Allow any localhost / 127.0.0.1 port during local development
            if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

// Simple request logger: shows every request hitting the server in the terminal.
app.use((req, _, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

cron.schedule("0 * * * *", cacheWarmer);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/home", require("./routes/homeRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/cart", auth, require("./routes/cartRoutes"));
app.use("/api/orders", auth, require("./routes/orderRoutes"));
app.use("/api/payment", auth, require("./routes/paymentRoutes"));

app.listen(PORT, () => {
    console.log(`Server started running on ${SERVER_URL}`);
});