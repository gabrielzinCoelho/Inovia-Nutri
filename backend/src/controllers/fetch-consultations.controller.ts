import {
  Controller,
  Get,
  HttpCode,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import * as dayjs from 'dayjs'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { FetchConsultationService } from 'src/services/fetch-consultation.service'
import { FetchConsultationstApiResponse } from 'src/swagger/consultations/fetch-consultations-api'

class FetchConsultationsDto {
  @ApiProperty({ required: true, example: '2024-12-12T06:00:00.000Z' })
  @IsOptional()
  minStartTime?: Date

  @ApiProperty({ required: true, example: '2024-12-12T21:00:00.000Z' })
  @IsOptional()
  maxStartTime?: Date
}

@ApiTags('Consultas')
@Controller('/consultations/')
export class FetchConsultationsController {
  constructor(private fetchConsultationService: FetchConsultationService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse(FetchConsultationstApiResponse)
  @UseGuards(JwtAuthGuard)
  async handle(@Query() { minStartTime, maxStartTime }: FetchConsultationsDto) {
    const fetchStartOfTheDay = !minStartTime
      ? undefined
      : dayjs(minStartTime).startOf('day').toDate()

    const fetchEndOfTheDay = !maxStartTime
      ? undefined
      : dayjs(maxStartTime).endOf('day').toDate()

    const consultations = await this.fetchConsultationService.execute({
      minStartTime: fetchStartOfTheDay,
      maxStartTime: fetchEndOfTheDay,
    })

    return { consultations }
  }
}
