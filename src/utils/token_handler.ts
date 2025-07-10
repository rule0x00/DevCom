import JWT from "jsonwebtoken"
import { userInterface } from "../models/users"
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.SECRET || ""

export const generateToken = (user: userInterface): string => {
    const userData = {
        email: user.email,
        name: user.user_name,
        bio: user.bio,
        age: user.age
    }

    const token = JWT.sign(userData, secret)

    return token;
}


export const validateToken = (token: string) => {
    const payload = JWT.verify(token, secret)
    return payload
}

