export type LoginRequest = {
  username: string;
  password: string;
};

export type User = {
  expiresIn: number;
  subject: string;
  roles: string[];
};

export type RegisterRequest = {
  username: string;
  password: string;
};

export type MeResponse = {
  subject: string;
  roles: string[];
  remainingSeconds: number;
};