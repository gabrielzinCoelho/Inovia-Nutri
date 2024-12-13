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

class FetchConsultationsDto {
  @ApiProperty({ required: true, example: 'to do' })
  @IsOptional()
  fetchStartTime?: Date

  @ApiProperty({ required: true, example: 'to do' })
  @IsOptional()
  fetchEndTime?: Date
}

@ApiTags('Consultas')
@Controller('/consultations/')
export class FetchConsultationsController {
  constructor(private fetchConsultationService: FetchConsultationService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse({})
  @UseGuards(JwtAuthGuard)
  async handle(
    @Query() { fetchStartTime, fetchEndTime }: FetchConsultationsDto,
  ) {
    const fetchStartOfTheDay = !fetchStartTime
      ? undefined
      : dayjs(fetchStartTime).startOf('day').toDate()

    const fetchEndOfTheDay = !fetchEndTime
      ? undefined
      : dayjs(fetchEndTime).endOf('day').toDate()

    const consultations = await this.fetchConsultationService.execute({
      fetchStartTime: fetchStartOfTheDay,
      fetchEndTime: fetchEndOfTheDay,
    })

    return { consultations }
  }
}
