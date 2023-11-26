import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-local';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretkey',
    });
  }

  async validate(payload) {
    return { id: payload.sub, user: payload.user };
  }
}
