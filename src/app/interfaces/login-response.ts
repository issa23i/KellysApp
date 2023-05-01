export interface LoginResponse {
    data: {
      token: string;
      user: {
        nombre: string;
        email: string;
        rol: string;
      }
    }
  }