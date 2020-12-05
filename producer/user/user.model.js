import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    name: String,
    email: String,
    password: String,
    cpf: string,
    gender: string,
    profiles: String[],
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    gender: {
        type: String,
        required: false,
        enum: ["Male", "Female"],
    },
    cpf: {
        type: String,
        required: false,
    },
    profiles: {
        type: [String],
        required: false
    }
})
export const User = mongoose.model<User>("User", userSchema);
