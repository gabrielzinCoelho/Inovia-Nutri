import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe'
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
  @UsePipes(new ZodValidationPipe(createNutritionistBodySchema))
  async handle(@Body() body: CreateNutritionistBodySchema) {
    const { name, email, password } = body

    const nutritionist = await this.createNutritionistService.execute({
      name,
      email,
      password,
    })

    return { nutritionist }
  }
}
