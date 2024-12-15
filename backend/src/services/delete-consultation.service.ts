import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Consultation } from 'src/schemas/consultation.schema'

interface DeleteConsultationServiceParams {
  id: string
}

@Injectable()
export class DeleteConsultationService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<Consultation>,
  ) {}

  async execute({
    id,
  }: DeleteConsultationServiceParams): Promise<Consultation> {
    const consultation = await this.consultationModel.findByIdAndDelete(id)

    if (!consultation)
      throw new BadRequestException('Consultation dont exists.')

    return consultation
  }
}
