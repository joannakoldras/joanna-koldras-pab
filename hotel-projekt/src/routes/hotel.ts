import { Router } from "express";

// Create router object.
export const hotelRouter = Router();

const hotels = ['ibis', 'mercure'];

// Implement all endpoints for restarant objects.

// Get all.
hotelRouter.get('/', (req, res) => {
    res.json(hotels);
});

// Get by id.
hotelRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const matchingHotel = hotels.find(x => x === id);
    res.json(matchingHotel);
});
