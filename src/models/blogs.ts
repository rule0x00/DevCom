import mongoose, {Model, mongo} from 'mongoose'
import { createHmac, randomBytes } from 'crypto';
import { generateToken } from '../utils/token_handler';

export interface blogInterface{
    name: string;
    user: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
}

const blogSchema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: mongoose.Schema.ObjectId, required: true, unique: true},
    content: {type: String, required: true},
    createdAt: {type: Date}
},{
    timestamps: true
})

const blogModel = mongoose.model<blogInterface>("users", blogSchema)

export default blogModel 
