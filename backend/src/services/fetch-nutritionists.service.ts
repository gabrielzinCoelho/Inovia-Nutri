import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Nutritionist } from 'src/schemas/nutritionist.schema'

@Injectable()
export class FetchNutritionistsService {
  constructor(
    @InjectModel(Nutritionist.name)
    private nutritionistModel: Model<Nutritionist>,
  ) {}

  async execute(): Promise<Nutritionist[]> {
    const nutritionists = await this.nutritionistModel.find()

    return nutritionists
  }
}
