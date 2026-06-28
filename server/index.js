const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => { console.log("DB connection established")})
.catch(err => {console.log(err)})

app.listen(5000, ()=>{
    console.log("server started")
})

const productRouter = require('./routes/productRoutes')
app.use("/", productRouter)