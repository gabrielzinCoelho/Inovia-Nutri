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

class CreateConsultationDto {
  @ApiProperty({ required: true, example: 'to do' })
  @IsNotEmpty()
  startTime: Date

  @ApiProperty({ required: true, example: '60' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  durationInMinutes: number

  @ApiProperty({ required: true, example: 'to do' })
  @IsNotEmpty()
  nutritionistId: string

  @ApiProperty({ required: true, example: 'to do' })
  @IsNotEmpty()
  clientId: string
}

@ApiTags('Consultas')
@Controller('/consultations')
export class CreateConsultationController {
  constructor(private createConsultationService: CreateConsultationService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse({})
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
