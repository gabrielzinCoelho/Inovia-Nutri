import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Env, envSchema } from './env'
import { MongooseModule } from '@nestjs/mongoose'

const configModuleValidationEnv = ConfigModule.forRoot({
  validate: (env) => envSchema.parse(env),
  isGlobal: true,
})

const mongooseModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService<Env, true>) => ({
    uri: configService.get('DATABASE_URL', { infer: true }),
  }),
})

@Module({
  imports: [configModuleValidationEnv, mongooseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
