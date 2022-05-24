import { Router } from "express";
import { hotelRouter } from "./hotel";
import { employeeRouter } from "./employee";
import { roomRouter } from "./room";
import { reservationRouter } from "./reservation"; 
import { authRouter } from "./auth";

// Create router object.
export const mainRouter = Router();

// Attach all restaraunt related endpoints under `/hotels` URL.
mainRouter.use('/auth', authRouter);
mainRouter.use('/hotels', hotelRouter);
mainRouter.use('/employees', employeeRouter);

mainRouter.use('/rooms', roomRouter); 
mainRouter.use('/reservations', reservationRouter); 
