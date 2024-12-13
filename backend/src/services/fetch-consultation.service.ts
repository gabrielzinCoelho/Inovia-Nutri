import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Biotype } from 'src/schemas/biotype.schema'
import { Client } from 'src/schemas/client.schema'
import { Consultation } from 'src/schemas/consultation.schema'
import { Nutritionist } from 'src/schemas/nutritionist.schema'

interface FetchConsultationServiceParams {
  minStartTime?: Date
  maxStartTime?: Date
}

@Injectable()
export class FetchConsultationService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<Consultation>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(Nutritionist.name)
    private nutritionistModel: Model<Nutritionist>,
    @InjectModel(Biotype.name)
    private biotypeModel: Model<Biotype>,
  ) {}

  async execute({
    minStartTime,
    maxStartTime,
  }: FetchConsultationServiceParams): Promise<Consultation[] | null> {
    const query: any = {}

    if (minStartTime) query.start_time = { $gte: minStartTime }

    if (maxStartTime) query.start_time = { $lte: maxStartTime }

    const consultations = await this.consultationModel.find(query)

    return consultations
  }
}
