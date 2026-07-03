const express = require("express")
const cors = require("cors")
const connectDB = require("./config/mongodb")
require("dotenv").config()

const app = express()
connectDB();

app.use(cors())
app.use(express.json())

app.listen(5000, ()=>{
    console.log("server started")
})

const productRouter = require('./routes/productRoutes')
app.use("/products", productRouter)

const homeRouter = require("./routes/homeRoutes")
app.use("/home", homeRouter)