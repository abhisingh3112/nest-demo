export interface JwtSign {
  access_token: string;
  refresh_token: string;
}

export interface JwtPayload {
  id: number;
  phoneNumber: number;
}

export interface Payload {
  id?: number;
  phoneNumber?: number;
}
