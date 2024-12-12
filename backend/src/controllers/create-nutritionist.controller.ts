import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { CreateNutritionistService } from 'src/services/create-nutritionist.service'

class CreateNutritionistDto {
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @MinLength(5)
  password: string
}

@Controller('/nutritionists')
export class CreateNutritionistController {
  constructor(private createNutritionistService: CreateNutritionistService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async handle(@Body() body: CreateNutritionistDto) {
    const { name, email, password } = body

    const nutritionist = await this.createNutritionistService.execute({
      name,
      email,
      password,
    })

    return { nutritionist }
  }
}
