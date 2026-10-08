export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
  subject: string;
  roles: string[];
};

export type RegisterRequest = {
  username: string;
  password: string;
};
