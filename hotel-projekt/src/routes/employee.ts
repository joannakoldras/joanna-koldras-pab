import { Router } from "express";
import { EmployeeModel } from "../schemas/employees.schema";
import crypto = require('crypto');
import { authGuard } from "./auth";

// Create router object.
export const employeeRouter = Router();

// Get all.
employeeRouter.get('/', authGuard, async (req, res) => {
    // { passwordHash: 0 } means we are not returning passwordHash field.
    const employees = await EmployeeModel.find({}, { passwordHash: 0 });

    res.json(employees);
});

// Get by id.
employeeRouter.get('/:id', authGuard, async (req, res) => {
    const id = req.params.id;
    const employee = await EmployeeModel.findOne({ _id: id }, { passwordHash: 0 });

    res.json(employee);
});

employeeRouter.post('/', async (req, res) => {
    const payload = req.body;
    //payload.password undefined = error 
    const passwordHash = crypto.pbkdf2Sync(payload.password, 'SECR3T',
        1000, 64, `sha512`).toString(`hex`);

    delete payload.password;

    const employee = new EmployeeModel(payload);

    employee.passwordHash = passwordHash;

    const result = await employee.save();

    res.json(result);
});

// Using PUT to replace whole document.
employeeRouter.put('/:id', authGuard, async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    await EmployeeModel.updateOne({ _id: id }, payload);

    res.status(200).send();
});

employeeRouter.delete('/:id', authGuard, async (req, res) => {
    const id = req.params.id;

    await EmployeeModel.deleteOne({ _id: id });

    res.status(200).send();
});
