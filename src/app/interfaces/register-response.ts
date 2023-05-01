export interface RegisterResponse {
    data: {
        token: string;
        user: {
            nif: string,
            nombre: string,
            apellido1: string,
            apellido2: string,
            email: string,
            rol: string,
        }
    }
}
