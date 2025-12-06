import mongoose, { Schema } from "mongoose";
import { userStatus, UserType } from "../libs/enums/user.enum";

const userSchema = new Schema ({
    userType: {
        type: String,
        enum: UserType,
        default: UserType.USER,
    },

    userStatus: {
        type: String,
        enum: userStatus,
        default: userStatus.ACTIVE,
    },

    userId: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
        match: [/^[a-zA-Z0-9]+$/, "Userid can be only letters and numbers!"],
    },

    userAge: {
        type: Date,
        required: true,
    },

    userLicence: {
        type: String,
        required: true,
    },

    userPhone: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
        match: [/^\+?[0-9]{9,15}$/, "Invalid phone number"],
    },

    userPassword: {
        type: String,
        select: false,
        required: true,
    },

    userAddress: {
        type: String,
    },

    userImage: {
        type: String,
    },

    userRating: {
        type: Number,
        default: 0,
    },
});

export default mongoose.model("User", userSchema);