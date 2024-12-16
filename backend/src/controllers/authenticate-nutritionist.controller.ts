import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IsEmail, MinLength } from 'class-validator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AuthenticateNutritionistService } from 'src/services/authenticate-nutritionist.service'
import {
  authenticateNutritionistApiResponse,
  validateNutritionistTokenApiResponse,
} from 'src/swagger/nutritionist/authenticate-nutritionist-api'

class AuthenticateNutritionistDto {
  @ApiProperty({ required: true, example: 'johndoe@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ required: true, example: 'passwd321' })
  @MinLength(5)
  password: string
}
@ApiTags('Nutricionistas')
@Controller('/sessions')
export class AuthenticateNutritionistController {
  constructor(
    private jwt: JwtService,
    private authenticateNutritionistService: AuthenticateNutritionistService,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse(authenticateNutritionistApiResponse)
  async handle(@Body() body: AuthenticateNutritionistDto) {
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
  @Get('/validate-token')
  @HttpCode(200)
  @ApiResponse(validateNutritionistTokenApiResponse)
  async validate() {
    return {
      statusToken: 'valid',
    }
  }
}
