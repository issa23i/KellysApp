export interface ResultadoBusqueda {
    hotelId:       string;
    nombreHotel?:   string;
    estrellas?:     number;
    imagen:     string;
    fechaCheckin:  Date;
    fechaCheckout: Date;
    numPlazas:     number;
    vistas?:        string;
    tipoCama?:      string;
    habitacionId:  string;
    precioTotal:   number;
}

