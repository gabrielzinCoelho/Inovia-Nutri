import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import {
  UpdateConsultationService,
  UpdateConsultationServiceResponse,
} from 'src/services/update-consultation.service'
import { UpdateConsultationApiResponse } from 'src/swagger/consultations/update-consultations-api'
import { IsValidObjectId } from 'src/validator/object-id.validator'

class UpdateConsultationBodyDto {
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
}

class UpdateConsultationRouteParamsDto {
  @ApiProperty({ required: true, example: '675cbf1b6b8f36c655c2dc56' })
  @IsNotEmpty()
  @IsValidObjectId()
  consultationId: string
}

@ApiTags('Consultas')
@Controller('/consultations')
export class UpdateConsultationController {
  constructor(private updateConsultationService: UpdateConsultationService) {}

  @Put(':consultationId')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse(UpdateConsultationApiResponse)
  @UseGuards(JwtAuthGuard)
  async handle(
    @Body() body: UpdateConsultationBodyDto,
    @Param() { consultationId }: UpdateConsultationRouteParamsDto,
  ): Promise<{ consultation: UpdateConsultationServiceResponse }> {
    const { startTime, durationInMinutes, nutritionistId, clientId } = body

    const consultation = await this.updateConsultationService.execute({
      id: consultationId,
      startTime,
      durationInMinutes,
      nutritionistId,
      clientId,
    })

    return { consultation }
  }
}
