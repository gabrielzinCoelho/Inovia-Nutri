import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Nutritionist } from 'src/schemas/nutritionist.schema'
import { hash } from 'bcryptjs'

interface CreateNutritionistServiceParams {
  name: string
  email: string
  password: string
}

@Injectable()
export class CreateNutritionistService {
  constructor(
    @InjectModel(Nutritionist.name)
    private nutritionistModel: Model<Nutritionist>,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateNutritionistServiceParams): Promise<Nutritionist> {
    const nutritionistWithSameEmail = await this.nutritionistModel.findOne({
      email,
    })

    if (nutritionistWithSameEmail)
      throw new Error('Nutritionist already exists.')

    const password_hash = await hash(password, 6)

    const nutritionistCreated = await this.nutritionistModel.create({
      name,
      email,
      password_hash,
    })

    return nutritionistCreated
  }
}
