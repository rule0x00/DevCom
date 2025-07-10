import express, { urlencoded } from "express"
import morgan from 'morgan'
import cors from 'cors'
import connection from "./utils/connect"
import userRouter from "./routes/user"
import blogRouter from './routes/blogs'
import cookieParser from 'cookie-parser'
import { authenticateUser } from "./middleware/authenticate"


const app = express()

//Middlewares
app.use(morgan('dev'));
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(authenticateUser("token"))

//Routes
app.use("/user", userRouter)
app.use("/blogs", blogRouter)

app.use("/home", (req, res) => {
    res.status(200).send("Welcome to DevCom. A Blogging application for lonely developers. Yeah you heard me.")
})

connection()




export default app