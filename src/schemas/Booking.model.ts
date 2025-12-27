import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
    {
        bookingTotal: {
            type: Number,
            required: true,
        },

        rentDays: {
            type: Number,
            required: true,
        },

        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },

        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        bookingStatus: {
            type: String,
            enum: ["PROCESS", "CONFIRMED", "COMPLETED", "CANCELLED"],
            default: "PROCESS",
        },
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

bookingSchema.virtual("bookingItems", {
    ref: "BookingItem",
    localField: "_id",
    foreignField: "bookingId",
});

export default mongoose.model("Booking", bookingSchema);