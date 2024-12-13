import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Biotype } from 'src/schemas/biotype.schema'
import { Client } from 'src/schemas/client.schema'
import { Consultation } from 'src/schemas/consultation.schema'
import { Nutritionist } from 'src/schemas/nutritionist.schema'

interface FetchConsultationServiceParams {
  fetchStartTime?: Date
  fetchEndTime?: Date
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
    fetchStartTime,
    fetchEndTime,
  }: FetchConsultationServiceParams): Promise<Consultation[] | null> {
    const query: any = {}

    if (fetchStartTime) query.start_time = { $gte: fetchStartTime }

    if (fetchEndTime) query.end_time = { $lte: fetchEndTime }

    const consultations = await this.consultationModel.find(query)

    return consultations
  }
}
