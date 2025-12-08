import mongoose, { Schema } from "mongoose";
import { VehicleCollection, VehicleFuel, VehicleStatus } from "../libs/enums/vehicle.enum";

const vehicleSchema = new Schema (
    {
        vehicleStatus: {
            type: String,
            enum: VehicleStatus,
            default: VehicleStatus.AVAILABLE,
        },

        vehicleCollection: {
            type: String,
            enum: VehicleCollection,
            required: true,
        },

        vehicleName: {
            type: String,
            required: true,
        },

        vehiclePrice: {
            type: Number,
            required: true,
        },

        vehicleFuel: {
            type: String,
            enum: VehicleFuel,
            required: true,
        },

        vehicleDoor: {
            type: Number,
            required: true,
        },

        vehicleSeat: {
            type: Number,
            required: true,
        },

        vehicleMile: {
            type: Number,
        },

        vehicleImages: {
            type: [String],
            default: [],
        },
    },
    {
        collection: "vehicles",
        timestamps: true,        // updatedAt, createdAt
    }
);

export default mongoose.model("Vehicles", vehicleSchema);
