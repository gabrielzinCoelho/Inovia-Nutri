import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { IsNotEmpty } from 'class-validator'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { EnvSchema } from 'src/env'

export class TokenPayloadDto {
  @IsNotEmpty()
  sub: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<EnvSchema, true>) {
    const jwtSecret = config.get('JWT_SECRET', { infer: true })
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      algorithms: ['HS256'],
    })
  }

  async validate(payload: TokenPayloadDto) {
    return payload
  }
}
