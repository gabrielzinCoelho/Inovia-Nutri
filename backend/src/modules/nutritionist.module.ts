import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CreateNutritionistController } from 'src/controllers/create-nutritionist.controller'
import {
  Nutritionist,
  NutritionistSchema,
} from 'src/schemas/nutritionist.schema'
import { CreateNutritionistService } from 'src/services/create-nutritionist.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nutritionist.name, schema: NutritionistSchema },
    ]),
  ],
  controllers: [CreateNutritionistController],
  providers: [CreateNutritionistService],
})
export class NutritionistModule {}
