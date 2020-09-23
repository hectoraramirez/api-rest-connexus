import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUser extends Document  {
    email: string;
    password: string;
    encryptPass(password: string): Promise<string>;
    validatePass(password: string): Promise<boolean>;
}

const userSchema =  new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
});

userSchema.methods.encryptPass =  async (password: string): Promise<string> =>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePass = async function (password: string ): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('Usuario', userSchema);