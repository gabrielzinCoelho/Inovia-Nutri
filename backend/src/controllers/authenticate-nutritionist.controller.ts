import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IsEmail, MinLength } from 'class-validator'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { TokenPayloadDto } from 'src/auth/jwt-strategy'
import { AuthenticateNutritionistService } from 'src/services/authenticate-nutritionist.service'

class AuthenticateNutritionistPayloadDto {
  @IsEmail()
  email: string

  @MinLength(5)
  password: string
}

@Controller('/sessions')
export class AuthenticateNutritionistController {
  constructor(
    private jwt: JwtService,
    private authenticateNutritionistService: AuthenticateNutritionistService,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async handle(@Body() body: AuthenticateNutritionistPayloadDto) {
    const { email, password } = body

    const nutritionist = await this.authenticateNutritionistService.execute({
      email,
      password,
    })

    const token = this.jwt.sign({
      sub: nutritionist['_id'],
    })

    return { token }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/validateToken')
  async validate(@CurrentUser() nutritionistPayload: TokenPayloadDto) {
    return nutritionistPayload
  }
}
