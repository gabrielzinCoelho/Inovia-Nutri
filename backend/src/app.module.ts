import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'

const configModuleValidationEnv = ConfigModule.forRoot({
  validate: (env) => envSchema.parse(env),
  isGlobal: true,
})

@Module({
  imports: [configModuleValidationEnv],
  controllers: [],
  providers: [],
})
export class AppModule {}
