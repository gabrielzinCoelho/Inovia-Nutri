import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { CreateNutritionistService } from 'src/services/create-nutritionist.service'
import { createNutritionistApiResponse } from 'src/swagger/nutritionist/create-nutritionist-api'

class CreateNutritionistDto {
  @ApiProperty({ required: true, example: 'John Doe' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ required: true, example: 'johndoe@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ required: true, example: 'passwd321' })
  @MinLength(5)
  password: string
}
@ApiTags('Nutricionistas')
@Controller('/nutritionists')
export class CreateNutritionistController {
  constructor(private createNutritionistService: CreateNutritionistService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse(createNutritionistApiResponse)
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
