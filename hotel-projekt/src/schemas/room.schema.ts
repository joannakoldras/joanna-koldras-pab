import { Schema, model } from 'mongoose';
import internal from 'stream';

// Interface represents the structure of the object in code.
interface IRoom {
    hotelID: string; 
    name: string;
    quantityGuests: number; 
    status: boolean;    
}

// Schema represents the structure of the object in database. Is almost the same as the interface.
const roomSchema = new Schema<IRoom>({
    hotelID: String, 
    name: String, 
    quantityGuests: Number,  
    status: Boolean, 
});

// Model is responsible for communicating with DB.
export const RoomModel = model<IRoom>('Room', roomSchema);
