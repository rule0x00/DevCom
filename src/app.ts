import express, { urlencoded } from "express"
import morgan from 'morgan'
import cors from 'cors'
import connection from "./utils/connect"
import router from "./routes/user"


const app = express()

app.use(morgan('dev'));
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use("/", router)


connection()




export default app