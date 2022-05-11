import { Schema, model } from 'mongoose';
import internal from 'stream';

// Interface represents the structure of the object in code.
interface IReservation {
    roomID: string; 
    hotelID: string; 
    dataFrom: Date; 
    dataTo: Date;
    nameCustomer: string; 
    surnameCustomer: string; 
    phoneCustomer: string;
    hotelName: string; 
    quantityGuests: number; 

}

// Schema represents the structure of the object in database. Is almost the same as the interface.
const reservationSchema = new Schema<IReservation>({
    roomID: String, 
    hotelID: String, 
    dataFrom: Date, 
    dataTo: Date, 
    nameCustomer: String, 
    surnameCustomer: String, 
    phoneCustomer: String, 
    hotelName: String, 
    quantityGuests: Number, 
});

// Model is responsible for communicating with DB.
export const ReservationModel = model<IReservation>('Reservation', reservationSchema);
