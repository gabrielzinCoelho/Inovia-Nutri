import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { isValidObjectId, Model, Types } from 'mongoose'
import { Biotype } from 'src/schemas/biotype.schema'
import { Client } from 'src/schemas/client.schema'

interface FindClientServiceParams {
  id: string
}

@Injectable()
export class FindClientService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<Client>,
    @InjectModel(Biotype.name)
    private biotypeModel: Model<Biotype>,
  ) {}

  async execute({ id }: FindClientServiceParams): Promise<Client> {
    const client = isValidObjectId(id)
      ? await this.clientModel
          .findById(new Types.ObjectId(id))
          .populate('biotype', '', this.biotypeModel)
      : false

    if (!client) throw new BadRequestException('Client does not exist.')
    return client
  }
}
