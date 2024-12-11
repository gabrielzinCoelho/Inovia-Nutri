import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Factory } from 'nestjs-seeder'
import type { Faker } from '@faker-js/faker'
import { hashSync } from 'bcryptjs'

@Schema({
  collection: 'nutritionists',
})
export class Nutritionist {
  @Factory((faker: Faker) => faker.person.fullName())
  @Prop({ required: true })
  name: string

  @Factory((faker: Faker) => faker.internet.email())
  @Prop({ required: true, unique: true })
  email: string

  @Factory(async (faker: Faker) => {
    const password = faker.internet.password()
    return hashSync(password, 6)
  })
  @Prop({ required: true })
  password_hash: string
}

export type NutritionistDocument = HydratedDocument<Nutritionist>

export const NutritionistSchema = SchemaFactory.createForClass(Nutritionist)
