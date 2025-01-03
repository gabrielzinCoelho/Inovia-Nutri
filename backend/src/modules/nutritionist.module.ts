import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CreateNutritionistController } from 'src/controllers/create-nutritionist.controller'
import { FetchNutritionistsController } from 'src/controllers/fetch-nutritionist.controller'
import {
  Nutritionist,
  NutritionistSchema,
} from 'src/schemas/nutritionist.schema'
import { CreateNutritionistService } from 'src/services/create-nutritionist.service'
import { FetchNutritionistsService } from 'src/services/fetch-nutritionists.service'
import { FindNutritionistService } from 'src/services/find-nutritionist.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nutritionist.name, schema: NutritionistSchema },
    ]),
  ],
  controllers: [CreateNutritionistController, FetchNutritionistsController],
  providers: [
    CreateNutritionistService,
    FetchNutritionistsService,
    FindNutritionistService,
  ],
  exports: [MongooseModule, FindNutritionistService],
})
export class NutritionistModule {}
