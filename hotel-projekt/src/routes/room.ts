import { Router } from "express";
import { RoomModel } from "../schemas/room.schema";

// Create router object.
export const roomRouter = Router();

// Implement all endpoints for restarant objects.

// Get all.
roomRouter.get('/', async (req, res) => {
    const hotels = await RoomModel.find({}); 

    res.json(hotels);
});

// Get by id.
roomRouter.get('/:id', async (req, res) => {
    const id = req.params.id; 
    const hotels = await RoomModel.findOne({ _id: id });

    res.json(hotels); 
});

roomRouter.post('/', async (req, res) => {
    const payload = req.body;
    // ??
    const hotel = new RoomModel(payload);

    const result = await hotel.save();

    res.json(result);
});

// Using PUT to replace whole document.
roomRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    await RoomModel.updateOne({ _id: id }, payload);

    res.status(200).send();
});

roomRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await RoomModel.deleteOne({ _id: id });

    res.status(200).send();
});
