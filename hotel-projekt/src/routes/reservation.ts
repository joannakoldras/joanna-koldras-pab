import { Router } from "express";
import { ReservationModel } from "../schemas/reservation.schema";

// Create router object.
export const reservationRouter = Router();

// Implement all endpoints for restarant objects.

// Get all.
reservationRouter.get('/', async (req, res) => {
    const reservations = await ReservationModel.find({}); 

    res.json(reservations);
});

// Get by id.
reservationRouter.get('/:id', async (req, res) => {
    const id = req.params.id; 
    const reservation = await ReservationModel.findOne({ _id: id });

    res.json(reservation); 
});

reservationRouter.post('/', async (req, res) => {
    const payload = req.body;

    const reservation = new ReservationModel(payload);

    const result = await reservation.save();

    res.json(result);
});

// Using PUT to replace whole document.
reservationRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    await ReservationModel.updateOne({ _id: id }, payload);

    res.status(200).send();
});

reservationRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await ReservationModel.deleteOne({ _id: id });

    res.status(200).send();
});
