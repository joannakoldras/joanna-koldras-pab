import { Schema, model } from 'mongoose';

// Interface represents the structure of the object in code.
interface IHotel {
    name: string;
    address: string;
    phone: string;
    nip: string;
    email: string;
    www: string;
    is_quarantined: boolean;
}

// Schema represents the structure of the object in database. Is almost the same as the interface.
const hotelSchema = new Schema<IHotel>({
    name: String, // String is shorthand for {type: String}
    address: String,
    phone: String,
    nip: String,
    email: String,
    www: String,
    is_quarantined: Boolean,
});

// Model is responsible for communicating with DB.
export const HotelModel = model<IHotel>('Hotel', hotelSchema);
