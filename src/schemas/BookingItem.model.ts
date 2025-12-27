import mongoose, { Schema } from "mongoose";

const bookingItemSchema = new Schema(
    {
        itemPrice: {
            type: Number,
            required: true,
        },

        itemQuantity: {
            type: Number,
            default: 1,
        },

        bookingId: {
            type: Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },

        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
    },
    { timestamps: true, collection: "bookingItems" }
);

export default mongoose.model("BookingItem", bookingItemSchema);