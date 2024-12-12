import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthenticateNutritionistController } from 'src/controllers/authenticate-nutritionist.controller'
import { Env } from 'src/env'

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
          },
          secret: jwtSecret,
        }
      },
    }),
  ],
  controllers: [AuthenticateNutritionistController],
})
export class AuthModule {}
