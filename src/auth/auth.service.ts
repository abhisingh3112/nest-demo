import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { JwtPayload, JwtSign, Payload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    // private user: UserService,
  ) {}

  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (!this.jwt.verify(refreshToken, { secret: process.env.JWT_SECRET })) {
      return false;
    }

    const payload = this.jwt.decode<{ sub: string }>(refreshToken);
    return payload.sub === data.userId;
  }

  public jwtSign(data: Payload): JwtSign {
    const payload: JwtPayload = { id: data.userId, phoneNumber: data.phoneNumber };

    return {
      access_token: this.jwt.sign(payload),
      refresh_token: this.getRefreshToken(payload.id),
    };
  }

  public getPayload(token: string): Payload | null {
    try {
      const payload = this.jwt.decode<JwtPayload | null>(token);
      if (!payload) {
        return null;
      }

      return { userId: payload.id, phoneNumber: payload.phoneNumber };
    } catch {
      // Unexpected token i in JSON at position XX
      return null;
    }
  }

  private getRefreshToken(id: string): string {
    return this.jwt.sign(
      { id },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d', // Set greater than the expiresIn of the access_token
      },
    );
  }
}
