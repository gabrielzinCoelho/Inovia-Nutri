import { Module, NotFoundException } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EnvSchema } from './env'
import { MongooseModule } from '@nestjs/mongoose'
import { NutritionistModule } from './modules/nutritionist.module'
import { AuthModule } from './modules/auth.module'
import { validateOrReject } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { ConsultationModule } from './modules/consultation.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        async () => {
          const env = process.env
          const envInstance = plainToInstance(EnvSchema, env, {
            exposeDefaultValues: true,
          })
          await validateOrReject(envInstance).catch((errors) => {
            throw new NotFoundException(
              `Environment variables failed.\n${errors}`,
            )
          })
          return envInstance
        },
      ],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvSchema, true>) => ({
        uri: configService.get('DATABASE_URL', { infer: true }),
      }),
    }),
    NutritionistModule,
    AuthModule,
    ConsultationModule,
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class AppModule {}
