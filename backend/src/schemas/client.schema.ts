import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Biotype } from './biotype.schema'

@Schema({
  collection: 'clients',
})
export class Client {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  cpf: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  date_of_birth: Date

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'biotypes',
    required: true,
  })
  biotype: Biotype
}

export type ClientDocument = mongoose.HydratedDocument<Client>

export const ClientSchema = SchemaFactory.createForClass(Client)
