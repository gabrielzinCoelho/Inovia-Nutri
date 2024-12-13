import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DataFactory, Seeder } from 'nestjs-seeder'
import { Biotype } from 'src/schemas/biotype.schema'
import { Client } from 'src/schemas/client.schema'

@Injectable()
export class ClientSeeder implements Seeder {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,

    @InjectModel(Biotype.name) private biotypeModel: Model<Biotype>,
  ) {}

  async seed(): Promise<any> {
    const biotypes = await this.biotypeModel.find()

    const seededClients = [
      ...DataFactory.createForClass(Client).generate(2, {
        biotypeId: biotypes[0]['_id'],
      }),
      ...DataFactory.createForClass(Client).generate(2, {
        biotypeId: biotypes[1]['_id'],
      }),
      ...DataFactory.createForClass(Client).generate(2, {
        biotypeId: biotypes[2]['_id'],
      }),
    ]
    return await this.clientModel.insertMany(seededClients)
  }

  async drop(): Promise<any> {
    return this.clientModel.deleteMany({})
  }
}
