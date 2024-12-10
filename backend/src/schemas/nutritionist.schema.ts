import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema({
  collection: 'nutritionists',
})
export class Nutritionist {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password_hash: string
}

export type NutritionistDocument = HydratedDocument<Nutritionist>

export const NutritionistSchema = SchemaFactory.createForClass(Nutritionist)
