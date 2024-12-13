import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Factory } from 'nestjs-seeder'

@Schema({
  collection: 'biotypes',
})
export class Biotype {
  @Factory((_, ctx) => ctx!.description)
  @Prop({ required: true, unique: true })
  description: string
}

export type BiotypeDocument = HydratedDocument<Biotype>

export const BiotypeSchema = SchemaFactory.createForClass(Biotype)
