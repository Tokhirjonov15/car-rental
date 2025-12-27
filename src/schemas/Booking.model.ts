import mongoose, { Schema } from "mongoose";
import { BookingStatus } from "../libs/enums/booking.enum";

const bookingSchema = new Schema(
    {
        bookingStatus: {
            type: String,
            enum: BookingStatus.PAUSE,
        },

        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);