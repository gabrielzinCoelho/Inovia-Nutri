import { ConflictException, Injectable } from '@nestjs/common'
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import * as dayjs from 'dayjs'
import { Connection, Model } from 'mongoose'
import { Consultation } from 'src/schemas/consultation.schema'
import { IsConsultationOverlappingService } from './is-consultation-overlapping.service'
import { Nutritionist } from 'src/schemas/nutritionist.schema'
import { Client } from 'src/schemas/client.schema'
import { Biotype } from 'src/schemas/biotype.schema'
import { FindNutritionistService } from './find-nutritionist.service'
import { FindClientService } from './find-client.service'

interface CreateRecurrentConsultationServiceParams {
  startTime: Date
  durationInMinutes: number
  nutritionistId: string
  clientId: string
  recurrenceInterval: number
  recurrenceEndTime: Date
}

@Injectable()
export class CreateRecurrentConsultationService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<Consultation>,
    @InjectModel(Nutritionist.name)
    private nutritionistModel: Model<Nutritionist>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(Biotype.name) private biotypeModel: Model<Biotype>,
    private isConsultationOverlapService: IsConsultationOverlappingService,
    @InjectConnection() private connection: Connection,
    private findNutritionistService: FindNutritionistService,
    private findClientService: FindClientService,
  ) {}

  async generateRecurrentConsultations(
    startTime: Date,
    recurrenceEndTime: Date,
    durationInMinutes: number,
    clientId: string,
    nutritionistId: string,
    recurrenceInterval: number,
  ) {
    let currentStartTime = dayjs(startTime)
    const recurrenceEndTimeFormated = dayjs(recurrenceEndTime).endOf('day')
    const consultations = [] as Consultation[]

    while (currentStartTime.isBefore(recurrenceEndTimeFormated)) {
      const endTimeConsultation = currentStartTime
        .add(durationInMinutes, 'minutes')
        .toDate()

      const isConsultationOverlapping =
        await this.isConsultationOverlapService.execute({
          startTime: currentStartTime.toDate(),
          endTime: endTimeConsultation,
          nutritionistId,
        })

      if (isConsultationOverlapping)
        throw new ConflictException('Two consultations cannot overlap in time.')

      consultations.push(
        new this.consultationModel({
          start_time: currentStartTime.toDate(),
          end_time: endTimeConsultation,
          nutritionist: nutritionistId,
          client: clientId,
          recurrence_interval: recurrenceInterval,
          recurrence_end_time: recurrenceEndTimeFormated,
        }),
      )

      currentStartTime = currentStartTime.add(recurrenceInterval, 'days')
    }

    return consultations
  }

  async execute({
    startTime,
    durationInMinutes,
    nutritionistId,
    clientId,
    recurrenceInterval,
    recurrenceEndTime,
  }: CreateRecurrentConsultationServiceParams): Promise<Consultation[]> {
    const nutritionist = await this.findNutritionistService.execute({
      id: nutritionistId,
    })

    const client = await this.findClientService.execute({ id: clientId })

    const generatedConsultations = await this.generateRecurrentConsultations(
      startTime,
      recurrenceEndTime,
      durationInMinutes,
      clientId,
      nutritionistId,
      recurrenceInterval,
    )

    const consultations = await this.consultationModel.insertMany(
      generatedConsultations,
    )
    return consultations.map((consultation) => ({
      ...consultation.toObject(),
      nutritionist,
      client,
    }))
  }
}
