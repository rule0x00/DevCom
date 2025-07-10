import mongoose, {Model} from 'mongoose'
import { createHmac, randomBytes } from 'crypto';
import { generateToken } from '../utils/token_handler';

export interface userInterface{
    user_name: string;
    email: string;
    bio: string;
    salt: string;
    age: Date;
    password: string
}

interface userModelInterface extends Model<userInterface> {
    generate_token(email: string, password: string): Promise<Omit<userInterface, "salt" | "password">>
}

const userSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    salt: {type: String},
    password: {type: String, required: true},
    bio: {type: String, },
    age: {type: Date}  
},{
    timestamps: true
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

//This could have also be done in a controller 
userSchema.static("generate_token", async function(this: Model<userInterface>, email: string, password: string){
    //here 'this' refers to the user model,
    const userDoc = await this.findOne({ email })

    if(!userDoc){
        throw new Error("User does not exist");
    }
    const salt = userDoc.salt

    const hashedPassword = userDoc.password

    const incomingHashedPassword = createHmac("sha256", salt).update(password).digest("hex")

    if(hashedPassword != incomingHashedPassword)
        throw new Error("Incorrect Password")

    const token = generateToken(userDoc)

    return token
})

const userModel = mongoose.model<userInterface,userModelInterface>("users", userSchema)

export default userModel 