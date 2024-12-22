import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FetchClientsController } from 'src/controllers/fetch-clients.controller'
import { Client, ClientSchema } from 'src/schemas/client.schema'
import { FetchClientsService } from 'src/services/fetch-clients.service'
import { BiotypeModule } from './biotype.module'
import { FindClientService } from 'src/services/find-client.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    BiotypeModule,
  ],
  controllers: [FetchClientsController],
  providers: [FetchClientsService, FindClientService],
  exports: [MongooseModule, FindClientService],
})
export class ClientModule {}
