import * as mongoose from "mongoose";
import { validateCPF } from "../common/validators";
import * as bcrypt from "bcryptjs";
import { environment } from "../common/environment";
import { sendEmailKafka } from "./users.producer";

export interface User extends mongoose.Document {
    name: String,
    email: String,
    password: String,
    cpf: string,
    gender: string,
    profiles: String[],
    matches(password: string): boolean,
    hasAny(...profiles: string[]): boolean
}
export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: String, projection?: string): Promise<User>
}

const userSchema = new mongoose.Schema({
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
        validate: {
            validator: validateCPF,
            message: "{PATH}: Invalid CPF ({VALUE})",
        },
    },
    profiles: {
        type: [String],
        required: false
    }
})

userSchema.statics.findByEmail = function (email: String, projection: string) {
    return this.findOne({ email }, projection)

}

userSchema.methods.matches = function (password: string): boolean {
    return bcrypt.compareSync(password, this.password)
}
userSchema.methods.hasAny = function (...profiles: string[]): boolean {
    return profiles.some(profile => this.profiles.indexOF(profile) !== -1)
}

const hashPassword = (obj, next) => {
    bcrypt
        .hash(obj.password, environment.security.saltRounds)
        .then((hash) => {
            obj.password = hash;
            next();
        })
        .catch(next);
}

const saveMiddleware = function (next) {
    const user: User = this;
    if (!user.isModified("password")) {
        next();
    } else {
        hashPassword(user, next)
    }
}
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    } else {
        hashPassword(this.getUpdate(), next)
    }
}
const sendEmail = function (next) {
    const user: User = this;
    delete user.password
    user.profiles = undefined
    sendEmailKafka(user)
}

userSchema.pre("save", saveMiddleware)
userSchema.pre("findOneAndUpdate", updateMiddleware)
userSchema.pre("update", updateMiddleware)
userSchema.post('save', sendEmail)

export const User = mongoose.model<User, UserModel>("User", userSchema);
