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

const authRouter = require("./routes/authRoutes")
app.use("/api/auth", authRouter)

const productRouter = require('./routes/productRoutes')
app.use("/api/products", productRouter)

const homeRouter = require("./routes/homeRoutes")
app.use("/api/home", homeRouter)

const categoryRouter = require("./routes/categoryRoutes")
app.use("/api/categories", categoryRouter)