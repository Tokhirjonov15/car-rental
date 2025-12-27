import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Error";
import { Booking, BookingInput, BookingInquiry } from "../libs/types/booking";
import { User } from "../libs/types/user";
import { VehicleStatus } from "../libs/enums/vehicle.enum";
import BookingModel from "../schemas/Booking.model";
import BookingItemModel from "../schemas/BookingItem.model";
import VehicleModel from "../schemas/Vehicle.model";

class BookingService {
    private readonly bookingModel;
    private readonly bookingItemModel;
    private readonly vehicleModel;

    constructor() {
        this.bookingModel = BookingModel;
        this.bookingItemModel = BookingItemModel;
        this.vehicleModel = VehicleModel;
    }

    public async createBooking(
        user: User,
        input: BookingInput
    ): Promise<Booking> {
        const userId = shapeIntoMongooseObjectId(user._id);
        const vehicleId = shapeIntoMongooseObjectId(input.vehicleId);
        const vehicle = await this.vehicleModel
            .findOne({
                _id: vehicleId,
                vehicleStatus: VehicleStatus.AVAILABLE,
            })
            .lean()
            .exec();

        if (!vehicle) {
            throw new Errors(
                HttpCode.NOT_FOUND,
                Message.NO_DATA_FOUND
            );
        }
        if (!input.rentDays || input.rentDays < 1) {
            throw new Errors(
                HttpCode.BAD_REQUEST,
                Message.CREATE_FAILED
            );
        }

        const bookingTotal = vehicle.vehiclePrice * input.rentDays;
        const newBooking = await this.bookingModel.create({
            userId,
            bookingTotal,
            rentDays: input.rentDays,
            vehicleId: vehicleId,
            bookingStatus: "PROCESS",
        });

        await this.bookingItemModel.create({
            bookingId: newBooking._id,
            itemQuantity: 1,
            itemPrice: vehicle.vehiclePrice,
            vehicleId: vehicleId,
        });
        const result = await this.bookingModel
            .findById(newBooking._id)
            .populate({
                path: "bookingItems",
                populate: {
                    path: "vehicleId",
                },
            })
            .lean()
            .exec();

        if (!result) {
            throw new Errors(
                HttpCode.BAD_REQUEST,
                Message.CREATE_FAILED
            );
        }

        return result as unknown as Booking;
    }

    public async getMyBookings(
        user: User,
        inquiry: BookingInquiry
    ): Promise<Booking[]> {
        const userId = shapeIntoMongooseObjectId(user._id);
        const matches = { userId: userId, bookingStatus: inquiry.bookingStatus };
        const result = await this.bookingModel
          .aggregate([
            { $match: matches},
            { $sort: { updatedAt: -1 } },
            { $skip: ( inquiry.page - 1 ) * inquiry.limit },
            { $limit: inquiry.limit },
            {
                $lookup: {
                    from: "bookingItems",
                    localField: "_id",
                    foreignField: "bookingId",
                    as: "bookingItems",
                },
            },
            {
                $lookup: {
                    from: "vehicles",
                    localField: "bookingItems.vehicleId",
                    foreignField: "_id",
                    as: "vehicledata",
                },
            },
          ])
          .exec();
          if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        return result;
    }
}

export default BookingService;