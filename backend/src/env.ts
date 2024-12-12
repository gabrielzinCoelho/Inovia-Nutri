import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator'

export class EnvSchema {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  PORT: number = 3333

  @IsNotEmpty()
  DATABASE_URL: string

  @IsNotEmpty()
  JWT_SECRET: string
}
