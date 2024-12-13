import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Biotype } from 'src/schemas/biotype.schema'
import { Client } from 'src/schemas/client.schema'
import { Consultation } from 'src/schemas/consultation.schema'
import { Nutritionist } from 'src/schemas/nutritionist.schema'

interface ShowConsultationServiceParams {
  id: string
}

@Injectable()
export class ShowConsultationService {
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
    id,
  }: ShowConsultationServiceParams): Promise<Consultation | null> {
    const consultation = await this.consultationModel
      .findById(id)
      .populate('nutritionist', '', this.nutritionistModel)
      .populate({
        path: 'client',
        model: this.clientModel,
        populate: {
          path: 'biotype',
          model: this.biotypeModel,
        },
      })

    return consultation
  }
}
