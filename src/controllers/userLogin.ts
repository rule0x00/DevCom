import userModel from "../models/users";

import { Request, Response } from "express";

async function userLogin(req: Request, res: Response) {
  const { email, password } = req.body;
    try {
        const token = await userModel.generate_token(email, password);

        res.status(201).cookie("token", token).redirect("/")
      } catch (err: any) {
        console.error(err.message);
        res.status(400).json({ error: err.message });
      }
}

export default userLogin