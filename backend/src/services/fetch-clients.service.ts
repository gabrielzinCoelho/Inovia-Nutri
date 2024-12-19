import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Biotype } from 'src/schemas/biotype.schema'
import { Client } from 'src/schemas/client.schema'

@Injectable()
export class FetchClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(Biotype.name)
    private biotypeModel: Model<Biotype>,
  ) {}

  async execute(): Promise<Client[]> {
    const clients = await this.clientModel
      .find()
      .populate('biotype', 'description', this.biotypeModel)

    return clients
  }
}
