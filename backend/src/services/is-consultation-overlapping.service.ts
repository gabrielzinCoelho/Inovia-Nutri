import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Consultation } from 'src/schemas/consultation.schema'

interface IsConsultationOverlappingServiceParams {
  consultationIdToIgnore?: string
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
    consultationIdToIgnore,
    startTime: newConsultationStartTime,
    endTime: newConsultationEndTime,
    nutritionistId,
  }: IsConsultationOverlappingServiceParams): Promise<boolean> {
    const overlappingConsultation = await this.consultationModel.find({
      nutritionist: nutritionistId,
      $nor: [
        { start_time: { $gte: newConsultationEndTime } }, // consulta existente começa depois da nova consulta
        { end_time: { $lte: newConsultationStartTime } }, // consulta existente termina antes da nova consulta
      ],
    })

    if (overlappingConsultation.length === 0) return false

    if (
      overlappingConsultation.length === 1 &&
      overlappingConsultation[0].id.toString() === consultationIdToIgnore
    )
      return false

    return true
  }
}
