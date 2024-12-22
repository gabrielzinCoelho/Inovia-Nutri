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
import { FindNutritionistService } from './find-nutritionist.service'
import { FindClientService } from './find-client.service'

interface UpdateConsultationServiceParams {
  id: string
  startTime: Date
  durationInMinutes: number
  nutritionistId: string
  clientId: string
}

export interface UpdateConsultationServiceResponse extends Consultation {
  nutritionist: Nutritionist
  client: Client
}

@Injectable()
export class UpdateConsultationService {
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
    id,
    startTime,
    durationInMinutes,
    nutritionistId,
    clientId,
  }: UpdateConsultationServiceParams): Promise<UpdateConsultationServiceResponse> {
    const consultation = isValidObjectId(id)
      ? await this.consultationModel.findById(new Types.ObjectId(id))
      : false

    if (!consultation)
      throw new BadRequestException('Consultation does not exist.')

    const nutritionist = await this.findNutritionistService.execute({
      id: nutritionistId,
    })

    const client = await this.findClientService.execute({
      id: clientId,
    })

    const endTime = dayjs(startTime).add(durationInMinutes, 'minutes').toDate()

    const isConsultationOverlapping =
      await this.isConsultationOverlapService.execute({
        consultationIdToIgnore: id,
        startTime,
        endTime,
        nutritionistId,
      })

    if (isConsultationOverlapping)
      throw new ConflictException('Two consultations cannot overlap in time.')

    const updatedConsultation = await this.consultationModel.findByIdAndUpdate(
      id,
      {
        start_time: startTime,
        end_time: endTime,
        nutritionist: nutritionistId,
        client: clientId,
      },
      {
        new: true,
      },
    )

    if (!updatedConsultation)
      throw new BadRequestException('Failed to update consultation.')

    return {
      ...updatedConsultation.toObject(),
      nutritionist,
      client,
    }
  }
}
