import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Biotype } from './biotype.schema'
import { Factory } from 'nestjs-seeder'
import type { Faker } from '@faker-js/faker'

@Schema({
  collection: 'clients',
})
export class Client {
  @Factory((faker: Faker) => faker.person.fullName())
  @Prop({ required: true })
  name: string

  @Factory((faker: Faker) =>
    faker.helpers.fromRegExp('[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}'),
  )
  @Prop({ required: true, unique: true })
  cpf: string

  @Factory((faker: Faker) => faker.internet.email())
  @Prop({ required: true })
  email: string

  @Factory((faker: Faker) =>
    faker.helpers.fromRegExp('([0-9]{2}) 9[0-9]{4}-[0-9]{4}'),
  )
  @Prop({ required: true })
  phone: string

  @Factory((faker: Faker) => faker.date.birthdate())
  @Prop({ required: true })
  date_of_birth: Date

  @Factory((_, ctx) => ctx!.biotypeId)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'biotypes',
    required: true,
  })
  biotype: Biotype
}

export type ClientDocument = mongoose.HydratedDocument<Client>

export const ClientSchema = SchemaFactory.createForClass(Client)
