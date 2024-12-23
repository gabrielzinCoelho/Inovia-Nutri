import { IsOptional } from '@nestjs/class-validator'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateConsultationService } from 'src/services/create-consultation.service'
import { CreateRecurrentConsultationService } from 'src/services/create-recurrent-consultation.service'
import { CreateConsultationApiResponse } from 'src/swagger/consultations/create-consultation-api'
import { IsAfterThan } from 'src/validator/is-after-than.validor'
import { IsValidObjectId } from 'src/validator/object-id.validator'

class CreateConsultationDto {
  @ApiProperty({ required: true, example: '2024-12-13T20:30:00.000Z' })
  @IsNotEmpty()
  startTime: Date

  @ApiProperty({ required: true, example: '60' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  durationInMinutes: number

  @ApiProperty({ required: true, example: '675cbf74c5464c094652f758' })
  @IsNotEmpty()
  @IsValidObjectId()
  nutritionistId: string

  @ApiProperty({ required: true, example: '675cbf1b6b8f36c655c2dc56' })
  @IsNotEmpty()
  @IsValidObjectId()
  clientId: string

  @ApiProperty({ required: false, example: '2024-12-31T20:30:00.000Z' })
  @IsOptional()
  @IsAfterThan('startTime')
  recurrenceEndTime: Date

  @ApiProperty({ required: false, example: '7' })
  @IsInt()
  @Min(1)
  @IsOptional()
  recurrenceInterval: number
}

@ApiTags('Consultas')
@Controller('/consultations')
export class CreateConsultationController {
  constructor(
    private createConsultationService: CreateConsultationService,
    private createRecurrentConsultationService: CreateRecurrentConsultationService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse(CreateConsultationApiResponse)
  @UseGuards(JwtAuthGuard)
  async handle(@Body() body: CreateConsultationDto) {
    const {
      startTime,
      durationInMinutes,
      nutritionistId,
      clientId,
      recurrenceEndTime,
      recurrenceInterval,
    } = body

    if (recurrenceEndTime && recurrenceInterval) {
      const intervalBetweenRecurrentConsultationsInMinutes =
        recurrenceInterval * 24 * 60

      if (intervalBetweenRecurrentConsultationsInMinutes < durationInMinutes)
        throw new BadRequestException('Recurrent consultations overlap.')

      const consultations =
        await this.createRecurrentConsultationService.execute({
          startTime,
          durationInMinutes,
          nutritionistId,
          clientId,
          recurrenceEndTime,
          recurrenceInterval,
        })

      return { consultations }
    }

    const consultation = await this.createConsultationService.execute({
      startTime,
      durationInMinutes,
      nutritionistId,
      clientId,
    })

    return { consultations: [consultation] }
  }
}
