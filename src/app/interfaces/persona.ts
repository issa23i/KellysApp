export interface Persona {
    _id?:       string;
    nif:       string;
    nombre:    string;
    apellido1: string;
    apellido2: string;
    email:     string;
    rol:       string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?:       number;
}
