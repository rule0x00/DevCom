import mongoose from 'mongoose'
import { createHmac, randomBytes } from 'crypto';

interface userInterface{
    user_name: string;
    email: string;
    bio: string;
    salt: string;
    age: Date;
    password: string
}

const userSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    salt: {type: String},
    password: {type: String, required: true},
    bio: {type: String, },
    age: {type: Date}  
})

//pre save middleware to generate salt
userSchema.pre("save", function (next) {
    const user = this

    const salt = randomBytes(16).toString() //random string

    if (typeof user.password !== "string") {
        return next(new Error("Password must be a string"))
    }

    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex")

    this.salt = salt
    this.password = hashedPassword

    if(!user.isModified("password")){
        return
    }

    next()
})

const userModel = mongoose.model<userInterface>("users", userSchema)

export default userModel 