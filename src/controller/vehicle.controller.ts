import { Response, Request } from "express";
import { T } from "../libs/types/common";
import Errors from "../libs/Error";
import VehicleService from "../schemas/Vehicle.model";

const vehicleService = new VehicleService();

const vehicleController: T = {};
vehicleController.getAllVehicles = async (req: Request, res: Response) => {
    try {
        console.log("getAllVehicles");
        res.render("vehicles");
    } catch (err) {
        console.log("Error, getAllVehicles:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
};

vehicleController.createNewVehicle = async (req: Request, res: Response) => {
    try {
        console.log("createNewVehicle");
        res.send("DONE");
    } catch (err) {
        console.log("Error, createNewVehicle:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
};

vehicleController.updateChosenVehicle = async (req: Request, res: Response) => {
    try {
        console.log("updateChosenVehicle");
        res.send("DONE");
    } catch (err) {
        console.log("Error, updateChosenVehicle:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
};

export default vehicleController;