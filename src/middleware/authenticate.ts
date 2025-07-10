import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/token_handler";

export function authenticateUser (cookie: string) {
    return (req:Request, res:Response, next: NextFunction) => {
        const tokenValue = req.cookies[cookie]
        if(!tokenValue){
            return next()
        }
        try{
            const userPayload = validateToken(tokenValue)

        }catch(error){
            throw error
        }

        return next()
    }
}