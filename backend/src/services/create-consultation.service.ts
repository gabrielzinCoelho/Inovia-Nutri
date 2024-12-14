import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as dayjs from 'dayjs'
import { isValidObjectId, Model, Types } from 'mongoose'
import { Consultation } from 'src/schemas/consultation.schema'
import { IsConsultationOverlappingService } from './is-consultation-overlapping.service'
import { Nutritionist } from 'src/schemas/nutritionist.schema'
import { Client } from 'src/schemas/client.schema'
import { Biotype } from 'src/schemas/biotype.schema'

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
  ) {}

  async execute({
    startTime,
    durationInMinutes,
    nutritionistId,
    clientId,
  }: CreateConsultationServiceParams): Promise<CreateConsultationServiceResponse> {
    const nutritionist = isValidObjectId(nutritionistId)
      ? await this.nutritionistModel.findById(
          new Types.ObjectId(nutritionistId),
        )
      : false

    if (!nutritionist)
      throw new BadRequestException('Nutritionist does not exist.')

    const client = isValidObjectId(clientId)
      ? await this.clientModel
          .findById(new Types.ObjectId(clientId))
          .populate('biotype', '', this.biotypeModel)
      : false

    if (!client) throw new BadRequestException('Client does not exist.')

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
    })

    return {
      ...consultation.toObject(),
      nutritionist,
      client,
    }
  }
}
