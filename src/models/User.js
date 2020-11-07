import { model, Schema } from 'mongoose';

export const Roles = ['admin', 'client'];

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength:[5]
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: [3]
    },
    lastname: {
        type: String,
        required: true,
        minlength:[3]
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    role: {
        type: String,
        required: true,
        enum : Roles,
        default: Roles[1]
    },
},{ versionKey: false, timestamps: true });

const User = model("User", userSchema);

export default User;