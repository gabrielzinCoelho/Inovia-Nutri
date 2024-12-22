import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { isValidObjectId, Model, Types } from 'mongoose'
import { Nutritionist } from 'src/schemas/nutritionist.schema'

interface FindNutritionistServiceParams {
  id: string
}

@Injectable()
export class FindNutritionistService {
  constructor(
    @InjectModel(Nutritionist.name)
    private nutritionistModel: Model<Nutritionist>,
  ) {}

  async execute({ id }: FindNutritionistServiceParams): Promise<Nutritionist> {
    const nutritionist = isValidObjectId(id)
      ? await this.nutritionistModel.findById(new Types.ObjectId(id))
      : false

    if (!nutritionist)
      throw new BadRequestException('Nutritionist does not exist.')
    return nutritionist
  }
}
