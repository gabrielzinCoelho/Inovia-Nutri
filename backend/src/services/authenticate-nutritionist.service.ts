import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Nutritionist } from 'src/schemas/nutritionist.schema'
import { compare } from 'bcryptjs'

interface AuthenticateNutritionistServiceParams {
  email: string
  password: string
}

@Injectable()
export class AuthenticateNutritionistService {
  constructor(
    @InjectModel(Nutritionist.name)
    private nutritionistModel: Model<Nutritionist>,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateNutritionistServiceParams): Promise<Nutritionist> {
    const nutritionist = await this.nutritionistModel.findOne({
      email,
    })

    if (!nutritionist)
      throw new UnauthorizedException('Nutritionist credentials do not match..')

    const isPasswordValid = await compare(password, nutritionist.password_hash)

    if (!isPasswordValid)
      throw new UnauthorizedException('Nutritionist credentials do not match..')

    return nutritionist
  }
}
