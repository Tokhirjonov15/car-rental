import mongoose, { Schema } from "mongoose";
import { UserStatus, UserType } from "../libs/enums/user.enum";

const userSchema = new Schema(
    {
        userType: {
            type: String,
            enum: Object.values(UserType),
            default: UserType.USER,
        },

        userStatus: {
            type: String,
            enum: Object.values(UserStatus),
            default: UserStatus.ACTIVE,
        },

        userId: {
            type: String,
            index: { unique: true, sparse: true },
            required: true,
        },

        userAge: {
            type: Number,
            required: true,
        },

        userPhone: {
            type: String,
            index: { unique: true, sparse: true },
            required: true,
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
    },
    {
        collection: "members",
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);