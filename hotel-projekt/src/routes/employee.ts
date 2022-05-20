import { Router } from "express";
import { EmployeeModel } from "../schemas/employees.schema";

// Create router object.
export const employeeRouter = Router();

// Implement all endpoints for restarant objects.

// Get all.
employeeRouter.get('/', async (req, res) => {
    const hotels = await EmployeeModel.find({}); 

    res.json(hotels);
});

// Get by id.
employeeRouter.get('/:id', async (req, res) => {
    const id = req.params.id; 
    const hotels = await EmployeeModel.findOne({ _id: id });

    res.json(hotels); 
});

employeeRouter.post('/', async (req, res) => {
    const payload = req.body;

    const hotel = new EmployeeModel(payload);

    const result = await hotel.save();

    res.json(result);
});

// Using PUT to replace whole document.
employeeRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    await EmployeeModel.updateOne({ _id: id }, payload);

    res.status(200).send();
});

employeeRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await EmployeeModel.deleteOne({ _id: id });

    res.status(200).send();
});
