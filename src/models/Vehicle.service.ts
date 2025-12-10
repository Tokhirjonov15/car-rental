import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Error";
import { Vehicle, VehicleInput, VehicleUpdateInput } from "../libs/types/vehicle";
import VehicleModel from "../schemas/Vehicle.model";

class VehicleService {
    private readonly vehicleModel;

    constructor() {
        this.vehicleModel = VehicleModel;
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
}

export default VehicleService;