import { VehicleCollection, VehicleFuel, VehicleStatus } from "../enums/vehicle.enum";

export interface Vehicle {
    vehicleStatus: VehicleStatus;
    vehicleCollection: VehicleCollection;
    vehicleName: string;
    vehiclePrice: number;
    vehicleFuel: VehicleFuel;
    vehicleDoor: number;
    vehicleSeat: number;
    vehicleMile?: number;
    vehicleRating: number;
    vehicleImages: string[];
    vehicleViews: number;
}

export interface VehicleInquiry {
    book: string;
    page: number;
    limit: number;
    vehicleCollection?: VehicleCollection;
    search?: string;
}

export interface VehicleInput {
    vehicleStatus?: VehicleStatus;
    vehicleCollection: VehicleCollection;
    vehicleName: string;
    vehiclePrice: number;
    vehicleFuel: VehicleFuel;
    vehicleDoor: number;
    vehicleSeat: number;
    vehicleMile?: number;
    vehicleImages?: string[];
    vehicleViews?: number;
}

export interface VehicleUpdateInput {
    vehicleStatus?: VehicleStatus;
    vehicleCollection?: VehicleCollection;
    vehicleName?: string;
    vehiclePrice?: number;
    vehicleFuel?: VehicleFuel;
    vehicleDoor?: number;
    vehicleSeat?: number;
    vehicleMile?: number;
    vehicleImages?: string[];
    vehicleViews?: number;
}