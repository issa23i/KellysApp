export interface Reserva {
    _id?:           string;
    cliente?:       string;
    hotel:         string;
    fechaCheckin:  Date;
    fechaCheckout: Date;
    numPlazas:     number;
    habitacion:    string;
    aceptada:      boolean;
}