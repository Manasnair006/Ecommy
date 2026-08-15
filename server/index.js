const express = require("express")
const cors = require("cors")
const connectDB = require("./config/mongodb")
require("dotenv").config()

const app = express()
connectDB();

app.use(cors())
app.use(express.json())

const cron = require("node-cron")
const cacheWarmer = require("./services/cacheWarmer")
cron.schedule("0 * * * *", cacheWarmer);

app.listen(5000, ()=>{
    console.log("server started")
})

const auth = require("./middleware/authMiddleware")

app.use("/api/auth", require("./routes/authRoutes"))

app.use("/api/products", require('./routes/productRoutes'))

app.use("/api/home", require("./routes/homeRoutes"))

app.use("/api/categories", require("./routes/categoryRoutes"))

app.use("/api/cart", auth,  require("./routes/cartRoutes"))

app.use("/api/orders", auth, require("./routes/orderRoutes"))