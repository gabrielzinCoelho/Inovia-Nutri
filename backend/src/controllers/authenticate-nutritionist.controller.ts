import { Controller, HttpCode, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Controller('/sessions')
export class AuthenticateNutritionistController {
  constructor(private jwt: JwtService) {}

  @Post()
  @HttpCode(200)
  async execute() {
    const token = this.jwt.sign({
      sub: 'nutritionist-id-example',
    })

    return { token }
  }
}
