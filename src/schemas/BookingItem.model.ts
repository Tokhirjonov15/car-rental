import mongoose, { Schema } from "mongoose";

const bookingItemSchema = new Schema(
    {
        vehiclePrice: {
            type: Number,
            required: true,
        },

        bookingId: {
            type: Schema.Types.ObjectId,
            ref: "Booking",
        },

        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: "Vehicle",
        },
    },
    { timestamps: true, collection: "bookingItems" }
);

export default mongoose.model("BookingItem", bookingItemSchema);