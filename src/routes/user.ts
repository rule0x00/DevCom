import express from 'express'
import { Request, Response } from 'express'
import userModel from '../models/users'
const router = express.Router()

router.post("/signup", async (req: Request, res: Response) => {
    const {user_name, email, password} = req.body

    if(!user_name || !email || !password){
        res.status(400).send("Missing curcial information")
    }
    try{
        const user = await userModel.create({
            user_name: user_name,
            email: email,
            password: password
        })
    
        res.status(201).json({"msg": `User succesfully created for ${user_name}`, "data": user})
        res.redirect("/")
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ error: err.message }); //Type safety bypass
          } else {
            res.status(500).json({ error: "Unknown error occurred" });
          }
    }
})


export default router