import { Router } from "express";
import { HotelModel } from "../schemas/hotel.schema";

// Create router object.
export const hotelRouter = Router();

// Implement all endpoints for restarant objects.

// Get all.
hotelRouter.get('/', async (req, res) => {
    // Using static method (find) from HotelModel
    // because we are operating in context of 'whole' collection.
    const hotels = await HotelModel.find({});

    res.json(hotels);
});

// Get by id.
hotelRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const hotels = await HotelModel.findOne({ _id: id });

    res.json(hotels); 
});

hotelRouter.post('/', async (req, res) => {
    const payload = req.body;

    // Creating new HotelModel object
    // because we are operating in context of 'single' document from a collection.
    const hotel = new HotelModel(payload);

    const result = await hotel.save();

    res.json(result);
});

// Using PUT to replace whole document.
hotelRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    await HotelModel.updateOne({ _id: id }, payload);

    res.status(200).send();
});

// Change status of hotel
hotelRouter.put('/:id/status', async (req, res) => {
    const id = req.params.id;
    const is_quarantined = req.body.status;

    const result = await HotelModel.findOneAndUpdate({ _id: id }, {
        $set: {
            is_quarantined: is_quarantined
        }
    }, { new: true });

    res.json(result);
});

// Using PATCH to update only provided values.
// This has EXACTLY the same end result as endpoint above (PUT :id/status)
// if only one field (is_quarantined) was sent. Just different way of implementing the same thing.
hotelRouter.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await HotelModel.findByIdAndUpdate(
        id,
        { $set: payload }, { new: true });

    res.json(result);
});

hotelRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await HotelModel.deleteOne({ _id: id });

    res.status(200).send();
});
