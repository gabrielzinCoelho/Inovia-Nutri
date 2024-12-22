import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as dayjs from 'dayjs'
import { Model } from 'mongoose'
import { Consultation } from 'src/schemas/consultation.schema'
import { IsConsultationOverlappingService } from './is-consultation-overlapping.service'
import { Nutritionist } from 'src/schemas/nutritionist.schema'
import { Client } from 'src/schemas/client.schema'
import { Biotype } from 'src/schemas/biotype.schema'
import { FindNutritionistService } from './find-nutritionist.service'
import { FindClientService } from './find-client.service'

interface CreateConsultationServiceParams {
  startTime: Date
  durationInMinutes: number
  nutritionistId: string
  clientId: string
}

export interface CreateConsultationServiceResponse extends Consultation {
  nutritionist: Nutritionist
  client: Client
}

@Injectable()
export class CreateConsultationService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<Consultation>,
    @InjectModel(Nutritionist.name)
    private nutritionistModel: Model<Nutritionist>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(Biotype.name) private biotypeModel: Model<Biotype>,
    private isConsultationOverlapService: IsConsultationOverlappingService,
    private findNutritionistService: FindNutritionistService,
    private findClientService: FindClientService,
  ) {}

  async execute({
    startTime,
    durationInMinutes,
    nutritionistId,
    clientId,
  }: CreateConsultationServiceParams): Promise<CreateConsultationServiceResponse> {
    const nutritionist = await this.findNutritionistService.execute({
      id: nutritionistId,
    })

    const client = await this.findClientService.execute({ id: clientId })

    const endTime = dayjs(startTime).add(durationInMinutes, 'minutes').toDate()

    const isConsultationOverlapping =
      await this.isConsultationOverlapService.execute({
        startTime,
        endTime,
        nutritionistId,
      })

    if (isConsultationOverlapping)
      throw new ConflictException('Two consultations cannot overlap in time.')

    const consultation = await this.consultationModel.create({
      start_time: startTime,
      end_time: endTime,
      nutritionist: nutritionistId,
      client: clientId,
      recurrence_interval: null,
      recurrence_end_time: null,
    })

    return {
      ...consultation.toObject(),
      nutritionist,
      client,
    }
  }
}
