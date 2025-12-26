import { shapeIntoMongooseObjectId } from "../libs/config";
import { VehicleStatus } from "../libs/enums/vehicle.enum";
import Errors, { HttpCode, Message } from "../libs/Error";
import { T } from "../libs/types/common";
import { Vehicle, VehicleInput, VehicleInquiry, VehicleUpdateInput } from "../libs/types/vehicle";
import VehicleModel from "../schemas/Vehicle.model";

class VehicleService {
    private readonly vehicleModel;

    constructor() {
        this.vehicleModel = VehicleModel;
    }

    /** SPA */
    public async getVehicles(inquiry: VehicleInquiry): Promise<Vehicle[]> {
    const match: T = { vehicleStatus: VehicleStatus.AVAILABLE };

    if (inquiry.vehicleCollection)
        match.vehicleCollection = inquiry.vehicleCollection;
    if (inquiry.search) {
        match.vehicleName = { $regex: new RegExp(inquiry.search, "i") };
    }

    // book field validation
    const validSortFields = [
        "vehiclePrice", 
        "vehicleRating", 
        "createdAt"
    ];
    const sortField = validSortFields.includes(inquiry.book) 
        ? inquiry.book 
        : "createdAt";
    
    const sort: T = sortField === "vehiclePrice"
        ? { [sortField]: 1 }   //  ascending
        : { [sortField]: -1 }; //  descending

    // Pagination validation
    const page = Math.max(1, inquiry.page || 1);
    const limit = Math.max(1, Math.min(50, inquiry.limit || 10)); // max 50
    const skip = (page - 1) * limit;

    console.log("Match:", match);
    console.log("Sort:", sort);
    console.log("Skip:", skip, "Limit:", limit);

    const result = await this.vehicleModel
        .aggregate([
            { $match: match },
            { $sort: sort },
            { $skip: skip },
            { $limit: limit },
        ])
        .exec();
    
    if (!result || result.length === 0) {
        throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    }

    return result;
}

    /** SSR */
    public async getAllVehicles(): Promise<Vehicle[]> {
        const result = await this.vehicleModel.find().exec();
        if (!result) 
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        return result;
    }

    public async createNewVehicle(input: VehicleInput): Promise<Vehicle> {
        try {
            return await this.vehicleModel.create(input);
        } catch (err) {
            console.error("DB create error:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async updateChosenVehicle(
        id: string,
        input: VehicleUpdateInput
    ): Promise<Vehicle> {
        id = shapeIntoMongooseObjectId(id);
        const result = await this.vehicleModel
          .findByIdAndUpdate({ _id: id}, input, {new: true})
          .exec();
        if (!result) 
            throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
        console.log("result:", result);
        return result;
    }

    public async getTopVehicles(): Promise<Vehicle[]> {
        const result = await this.vehicleModel
            .find({
                vehicleStatus: VehicleStatus.AVAILABLE,
            })
            .sort({ vehicleRating: -1, createdAt: -1 })
            .limit(4)
            .exec();
        
        if (!result || result.length === 0) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        }

        return result;
    }
}

export default VehicleService;