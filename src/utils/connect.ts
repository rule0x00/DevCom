import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const URI = process.env.URI || ""

const connection = async () => {
    await mongoose.connect(URI).then(() => {
        console.log("Connected to mongodb")
    })
}

export default connection