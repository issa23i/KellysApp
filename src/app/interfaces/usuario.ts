export interface Usuario {
    data: {
        token: string;
        user: {
          _id?: string,
          nombre?: string;
          rol?: string;
        }
      }
}
