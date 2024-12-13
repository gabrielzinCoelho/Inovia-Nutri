import {
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
import { CreateConsultationApiResponse } from 'src/swagger/consultations/create-consultation-api'
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
}

@ApiTags('Consultas')
@Controller('/consultations')
export class CreateConsultationController {
  constructor(private createConsultationService: CreateConsultationService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse(CreateConsultationApiResponse)
  @UseGuards(JwtAuthGuard)
  async handle(@Body() body: CreateConsultationDto) {
    const { startTime, durationInMinutes, nutritionistId, clientId } = body

    const consultation = await this.createConsultationService.execute({
      startTime,
      durationInMinutes,
      nutritionistId,
      clientId,
    })

    return { consultation }
  }
}
