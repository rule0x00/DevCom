import userModel from "../models/users";

import { Request, Response } from "express";

async function userSignup(req: Request, res: Response) {
    const {user_name, email, password} = req.body

    if(!user_name || !email || !password){
        res.status(400).send("Missing crucial information")
    }
    try{
        const user = await userModel.create({
            user_name: user_name,
            email: email,
            password: password
        })
    
        res.status(201).json({"msg": `User succesfully created for ${user_name}`, "data": user})
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ error: err.message }); //Type safety bypass

          } else {
            res.status(500).json({ error: "Unknown error occurred" });
          }
    }
}

export default userSignup