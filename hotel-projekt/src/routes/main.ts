import { Router } from "express";
import { hotelRouter } from "./hotel";

// Create router object.
export const mainRouter = Router();

// Attach all restaraunt related endpoints under `/restaurants` URL.
mainRouter.use('/hotels', hotelRouter);

// mainRouter.use('/rooms', roomsRouter);
// mainRouter.use('/employees', employeesRouter);
// etc.
