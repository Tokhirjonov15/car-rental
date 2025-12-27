import { ObjectId } from "mongoose";
import { BookingStatus } from "../enums/booking.enum";

export interface BookingInput {
    vehicleId: string | ObjectId;
    rentDays: number;
}

export interface Booking {
    _id: ObjectId;
    bookingTotal: number;
    rentDays: number; 
    vehicleId: ObjectId;  
    userId: ObjectId;
    bookingStatus: string;
    bookingItems?: BookingItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface BookingItem {
    _id: ObjectId;
    itemPrice: number;  
    itemQuantity: number;  
    bookingId: ObjectId;
    vehicleId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookingInquiry {
    page: number;
    limit: number;
    bookingStatus: BookingStatus;
}

export interface BookingUpdateInput {
    bookingId: string;
    bookingStatus: BookingStatus;
}