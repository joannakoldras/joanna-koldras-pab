import { Router } from "express";
import { RoomModel } from "../schemas/room.schema";

// Create router object.
export const roomRouter = Router();

// Implement all endpoints for hotel objects.

// Get all.
roomRouter.get('/', async (req, res) => {
    const skip = parseInt(req.query.skip as string) || 0;
    const limit = parseInt(req.query.limit as string) || 0;
    const sortBy = req.query.sortBy as string;
    const sortOrderParam = req.query.sortOrder as string;
    const sortOrder = sortOrderParam === 'desc' ? -1 : 1;

    let query = RoomModel.find({});

    if (sortBy) {
        query = query.sort({ [sortBy]: sortOrder })
    }

    const rooms = await query.skip(skip).limit(limit);

    res.json(rooms);
});

//Losowe wartości pokoi 
// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// roomRouter.get('/populate', async (req, res) => {
//     const rooms = Array(100).fill(null).map((x, index) => {
//         return new RoomModel({
//             roomID: '627e874dd52d884a2d9bc1fd',
//             name: roomNames[getRandomInt(0, roomNames.length)] + ' room',
//             roomNumber: index + 1,
//             quantityGuests: getRandomInt(1, 5),
//             isFree: true
//         })
//     })

//     RoomModel.insertMany(rooms);

//     // const rooms = await roomModel.find({});

//     res.sendStatus(200);
// });

// Get by id.
roomRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const rooms = await RoomModel.findOne({ _id: id });

    res.json(rooms);
});

roomRouter.post('/', async (req, res) => {
    const payload = req.body;

    const room = new RoomModel(payload);

    const result = await room.save();

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