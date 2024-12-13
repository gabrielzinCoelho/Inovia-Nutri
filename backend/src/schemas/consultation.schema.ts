import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Nutritionist } from './nutritionist.schema'
import { Client } from './client.schema'

@Schema({
  collection: 'consultations',
})
export class Consultation {
  @Prop({ required: true })
  start_time: Date

  @Prop({ required: true })
  end_time: Date

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nutritionists',
    required: true,
  })
  nutritionist: Nutritionist

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients',
    required: true,
  })
  client: Client
}

export type ConsultationDocument = mongoose.HydratedDocument<Consultation>

export const ConsultationSchema = SchemaFactory.createForClass(Consultation)
