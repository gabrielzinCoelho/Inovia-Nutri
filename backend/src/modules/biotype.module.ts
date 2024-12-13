import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Biotype, BiotypeSchema } from 'src/schemas/biotype.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Biotype.name, schema: BiotypeSchema }]),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class BiotypeModule {}
