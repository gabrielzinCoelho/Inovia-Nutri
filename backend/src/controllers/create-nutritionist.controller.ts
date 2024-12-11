import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateNutritionistService } from 'src/services/create-nutritionist.service'
import { z } from 'zod'

const createNutritionistBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
})

type CreateNutritionistBodySchema = z.infer<typeof createNutritionistBodySchema>

@Controller('/nutritionists')
export class CreateNutritionistController {
  constructor(private createNutritionistService: CreateNutritionistService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateNutritionistBodySchema) {
    const { name, email, password } = createNutritionistBodySchema.parse(body)

    const nutritionist = await this.createNutritionistService.execute({
      name,
      email,
      password,
    })

    return { nutritionist }
  }
}
