export interface AuthResponse{
    token: string;
    username: string;
    role: 'USER' | 'ADMIN';
  }
