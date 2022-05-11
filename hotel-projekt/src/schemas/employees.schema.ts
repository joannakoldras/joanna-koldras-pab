import { Schema, model } from 'mongoose';
import internal from 'stream';

// Interface represents the structure of the object in code.
interface IEmployee {
    name: string;
    surname: string; 
    position: string; 
    hotelID: string; 
}

// Schema represents the structure of the object in database. Is almost the same as the interface.
const employeeSchema = new Schema<IEmployee>({
    name: String, 
    surname: String, 
    position: String, 
    hotelID: String, 
});

// Model is responsible for communicating with DB.
export const EmployeeModel = model<IEmployee>('Employee', employeeSchema);
