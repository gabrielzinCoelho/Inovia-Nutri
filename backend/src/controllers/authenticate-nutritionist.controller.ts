import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { TokenSchema } from 'src/auth/jwt-strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe'
import { AuthenticateNutritionistService } from 'src/services/authenticate-nutritionist.service'
import { z } from 'zod'

const authenticateNutritionistBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

type AuthenticateNutritionistBodySchema = z.infer<
  typeof authenticateNutritionistBodySchema
>

@Controller('/sessions')
export class AuthenticateNutritionistController {
  constructor(
    private jwt: JwtService,
    private authenticateNutritionistService: AuthenticateNutritionistService,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateNutritionistBodySchema))
  async handle(@Body() body: AuthenticateNutritionistBodySchema) {
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

  @UseGuards(AuthGuard('jwt'))
  @Post('/validateToken')
  async validate(@CurrentUser() nutritionistPayload: TokenSchema) {
    return nutritionistPayload
  }
}
