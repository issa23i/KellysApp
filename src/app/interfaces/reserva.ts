export interface Reserva {
    _id?:           string;
    cliente:       string;
    hotel:         string;
    fechaCheckin:  Date;
    fechaCheckout: Date;
    numPlazas:     number;
    habitacion:    string;
    aceptada:      boolean;
    createdAt?:     Date;
    updatedAt?:     Date;
    __v?:           number;
}