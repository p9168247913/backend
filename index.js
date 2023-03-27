const express = require("express")
require("dotenv").config()
const cors=require("cors")
const userRouter = require("./routes/user.route")
const connection  = require("./config/db")
const postRouter = require("./routes/post.route")
const AuthMiddleware = require("./Middleware/AuthMiddleware")

const app = express()
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/users",userRouter)
app.use(AuthMiddleware)
app.use("/posts",postRouter)



app.listen(process.env.port, async() => { 
    try{
        await connection
        console.log("Connected to DB")
    }catch(e){
        console.log(e)
    }
    console.log(`Server started on port ${process.env.port}`)
 })