import { Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Error";
import { T } from "../libs/types/common";
import { ExtendsRequest } from "../libs/types/user";
import BookingService from "../models/Booking.service";
import { BookingInquiry, BookingUpdateInput } from "../libs/types/booking";
import { BookingStatus } from "../libs/enums/booking.enum";

const bookingService = new BookingService();
const bookingController: T = {};

bookingController.createBooking = async (
  req: ExtendsRequest,
  res: Response
) => {
  try {
    console.log("createBooking");

    const result = await bookingService.createBooking(
      req.user,
      req.body
    );

    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("Error, createBooking:", err);
    if (err instanceof Errors)
      res.status(err.code).json(err);
    else
      res.status(Errors.standart.code).json(Errors.standart);
  }
};

bookingController.getMyBookings = async (
    req: ExtendsRequest,
    res: Response
) => {
    try {
        console.log("getMyBookings");
        const {page, limit, bookingStatus} = req.query;
        const inquiry: BookingInquiry = {
            page: Number(page),
            limit: Number(limit),
            bookingStatus: bookingStatus as BookingStatus
        }
        console.log("bookingInquiry:", inquiry);
        const result = await bookingService.getMyBookings(req.user, inquiry);

        res.status(HttpCode.CREATED).json(result);
    } catch (err) {
        console.log("Error, getMyBookings:", err);
    if (err instanceof Errors)
      res.status(err.code).json(err);
    else
      res.status(Errors.standart.code).json(Errors.standart);
    }
}

bookingController.updateBooking = async (
    req: ExtendsRequest,
    res: Response
) => {
    try {
        console.log("updateBooking");
        const input: BookingUpdateInput = req.body;
        const result = await bookingService.updateBooking(req.user, input);

        res.status(HttpCode.CREATED).json(result);
    } catch (err) {
        console.log("Error, updateBooking:", err);
    if (err instanceof Errors)
      res.status(err.code).json(err);
    else
      res.status(Errors.standart.code).json(Errors.standart);
    }
}

export default bookingController;
