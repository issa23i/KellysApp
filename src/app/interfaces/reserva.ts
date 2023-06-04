export interface Reserva {
    [x: string]: any;
    _id?:           string;
    cliente?:       string;
    hotel:         string;
    fechaCheckin:  Date;
    fechaCheckout: Date;
    numPlazas:     number;
    habitacion:    string;
    aceptada:      boolean;
    precioTotal:    number;
}