import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from 'src/auth/jwt-strategy'
import { AuthenticateNutritionistController } from 'src/controllers/authenticate-nutritionist.controller'
import { Env } from 'src/env'
import { NutritionistModule } from './nutritionist.module'
import { AuthenticateNutritionistService } from 'src/services/authenticate-nutritionist.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const jwtSecret = config.get('JWT_SECRET', { infer: true })
        return {
          signOptions: {
            algorithm: 'HS256',
            expiresIn: '1h',
          },
          secret: jwtSecret,
        }
      },
    }),
    NutritionistModule,
  ],
  controllers: [AuthenticateNutritionistController],
  providers: [JwtStrategy, AuthenticateNutritionistService],
})
export class AuthModule {}
