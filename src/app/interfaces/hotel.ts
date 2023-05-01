export interface Hotel {
    _id:                string;
    nombre:             string;
    direccion:          string;
    ciudad:             string;
    descripcion:        string;
    servicios:          string[];
    tieneSello:         boolean;
    imagenes:           string[];
    puntuacion_resenas: number;
    estrellas:          number;
}
