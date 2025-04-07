export interface User{
  id?: number;
  username: string;
  password?: string;
  role: 'USER' | 'ADMIN'
  }
