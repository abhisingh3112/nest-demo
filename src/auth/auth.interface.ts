export interface JwtSign {
  access_token: string;
  refresh_token: string;
}

export interface JwtPayload {
  id: string;
  phoneNumber: number;
}

export interface Payload {
  userId?: string;
  phoneNumber?: number;
}
