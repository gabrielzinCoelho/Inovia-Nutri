import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Consultation } from 'src/schemas/consultation.schema'

interface IsConsultationOverlappingServiceParams {
  startTime: Date
  endTime: Date
  nutritionistId: string
}

@Injectable()
export class IsConsultationOverlappingService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<Consultation>,
  ) {}

  async execute({
    startTime: newConsultationStartTime,
    endTime: newConsultationEndTime,
    nutritionistId,
  }: IsConsultationOverlappingServiceParams): Promise<boolean> {
    console.log(
      newConsultationStartTime,
      newConsultationEndTime,
      nutritionistId,
    )

    const overlappingConsultation = await this.consultationModel.findOne({
      nutritionist: nutritionistId,
      $nor: [
        { start_time: { $gte: newConsultationEndTime } }, // consulta existente começa depois da nova consulta
        { end_time: { $lte: newConsultationStartTime } }, // consulta existente termina antes da nova consulta
      ],
    })

    console.log(overlappingConsultation)

    return !!overlappingConsultation
  }
}
