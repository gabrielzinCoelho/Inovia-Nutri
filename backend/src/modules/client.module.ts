import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Client, ClientSchema } from 'src/schemas/client.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class ClientModule {}
