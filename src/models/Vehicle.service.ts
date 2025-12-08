import Errors, { HttpCode, Message } from "../libs/Error";
import { Vehicle, VehicleInput } from "../libs/types/vehicle";
import VehicleModel from "../schemas/Vehicle.model";

class VehicleService {
    private readonly vehicleModel;

    constructor() {
        this.vehicleModel = VehicleModel;
    }

    /** SSR */
    public async createNewVehicle(input: VehicleInput): Promise<Vehicle> {
        try {
            return await this.vehicleModel.create(input);
        } catch (err) {
            console.error("DB create error:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }
}

export default VehicleService;