import VehicleModel from "../schemas/Vehicle.model";

class VehicleService {
    private readonly vehicleModel;

    constructor() {
        this.vehicleModel = VehicleModel;
    }
}

export default VehicleService;