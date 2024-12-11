import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DataFactory, Seeder } from 'nestjs-seeder'
import { Nutritionist } from 'src/schemas/nutritionist.schema'

@Injectable()
export class NutritionistSeeder implements Seeder {
  constructor(
    @InjectModel(Nutritionist.name)
    private nutritionistModel: Model<Nutritionist>,
  ) {}

  async seed(): Promise<any> {
    console.log('seed')
    const seededNutritionists =
      DataFactory.createForClass(Nutritionist).generate(2)
    return await this.nutritionistModel.insertMany(seededNutritionists)
  }

  async drop(): Promise<any> {
    console.log('drop')
    return this.nutritionistModel.deleteMany({})
  }
}
