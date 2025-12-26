import { Response, Request } from "express";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Error";
import { VehicleInput, VehicleInquiry } from "../libs/types/vehicle";
import { AdminRequest, ExtendsRequest } from "../libs/types/user";
import VehicleService from "../models/Vehicle.service";
import { VehicleCollection } from "../libs/enums/vehicle.enum";

const vehicleService = new VehicleService();

const vehicleController: T = {};

/** SPA */
vehicleController.getVehicles = async (req: Request, res: Response) => {
    try {
        console.log("getVehicles");
        console.log("Query params:", req.query); // Debug
        
        const { page, limit, book, vehicleCollection, search } = req.query;
        
        const inquiry: VehicleInquiry = {
            book: book ? String(book) : "createdAt",  // Default sort field
            page: page ? Number(page) : 1,            // Default page 1
            limit: limit ? Number(limit) : 10,        // Default limit 10
        };
        
        if (isNaN(inquiry.page) || inquiry.page < 1) inquiry.page = 1;
        if (isNaN(inquiry.limit) || inquiry.limit < 1) inquiry.limit = 10;
        
        if (vehicleCollection)
            inquiry.vehicleCollection = vehicleCollection as VehicleCollection;
        if (search) inquiry.search = String(search);

        console.log("Inquiry:", inquiry);
        
        const result = await vehicleService.getVehicles(inquiry);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getVehicles:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
};

vehicleController.getVehicle = async (req: ExtendsRequest, res: Response) => {
    try {
        console.log("getVehicle");
        const { id } = req.params;
        const userId = req.user?._id ?? null,
          result = await vehicleService.getVehicle(userId, id);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getVehicle:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

/** SSR */
vehicleController.getAllVehicles = async (req: Request, res: Response) => {
    try {
        console.log("getAllVehicles");
        const data = await vehicleService.getAllVehicles();
        console.log("Data:", data);
        
        res.render("vehicles", { vehicles: data });
    } catch (err) {
        console.log("Error, getAllVehicles:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
};

vehicleController.createNewVehicle = async (req: AdminRequest, res: Response) => {
    try {
        console.log("createNewVehicle");

        const data: VehicleInput = req.body,
          files = req.files as Express.Multer.File[];
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

vehicleController.getTopVehicles = async (req: Request, res: Response) => {
    try {
        console.log("getTopVehicles");
        const result = await vehicleService.getTopVehicles();

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getTopVehicles:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

vehicleController.updateChosenVehicle = async (req: Request, res: Response) => {
    try {
        console.log("updateChosenVehicle");
        const id = req.params.id;
        console.log("Id:", id);

        const result = await vehicleService.updateChosenVehicle(id, req.body);
        res.status(HttpCode.OK).json({ data: result });
    } catch (err) {
        console.log("Error, updateChosenVehicle:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
};

export default vehicleController;