import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DataFactory, Seeder } from 'nestjs-seeder'
import { Nutritionist } from 'src/schemas/nutritionist.schema'
import { hash } from 'bcryptjs'
@Injectable()
export class NutritionistSeeder implements Seeder {
  constructor(
    @InjectModel(Nutritionist.name)
    private nutritionistModel: Model<Nutritionist>,
  ) {}

  async seed(): Promise<any> {
    const seededNutritionists =
      DataFactory.createForClass(Nutritionist).generate(2)

    const defaultNutritionist = new this.nutritionistModel({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345', 6),
    })
    return await this.nutritionistModel.insertMany([
      ...seededNutritionists,
      defaultNutritionist,
    ])
  }

  async drop(): Promise<any> {
    return this.nutritionistModel.deleteMany({})
  }
}
