import { Response, Request } from "express";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Error";
import { VehicleInput } from "../libs/types/vehicle";
import { AdminRequest } from "../libs/types/user";
import VehicleService from "../models/Vehicle.service";

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

vehicleController.createNewVehicle = async (req: AdminRequest, res: Response) => {
    try {
        console.log("createNewVehicle");
        // if (!req.files?.length)
        //     throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

        const data: VehicleInput = req.body;
        const files = req.files as Express.Multer.File[];
        console.log("req.files:", req.files);
        

        data.vehicleImages = files.map(ele => {
            return ele.path.replace(/\\/g, "/");
        });
        
        await vehicleService.createNewVehicle(data);
        res.send(
            `<script>alert("Successfull creation!"); window.location.replace("/admin/vehicle/all")</script>`
        );
    } catch (err) {
        console.log("Error, createNewVehicle:", err);
        const message = 
          err instanceof Errors ? err.message : Message.SOMETHNG_WENT_WRONG;

        res.send(
            `<script>alert("${message}"); window.location.replace('/admin/vehicle/all')</script>`
        );
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