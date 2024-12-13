import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema({
  collection: 'biotypes',
})
export class Biotype {
  @Prop({ required: true, unique: true })
  description: string
}

export type BiotypeDocument = HydratedDocument<Biotype>

export const BiotypeSchema = SchemaFactory.createForClass(Biotype)
