import {
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ShowConsultationService } from 'src/services/show-consultation.service'
import { IsValidObjectId } from 'src/validator/object-id.validator'

class ShowConsultationDto {
  @ApiProperty({ required: true, example: 'to do' })
  @IsValidObjectId()
  consultationId: string
}

@ApiTags('Consultas')
@Controller('/consultations/')
export class ShowConsultationController {
  constructor(private showConsultationService: ShowConsultationService) {}

  @Get(':consultationId')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse({})
  @UseGuards(JwtAuthGuard)
  async handle(@Param() { consultationId }: ShowConsultationDto) {
    const consultation = await this.showConsultationService.execute({
      id: consultationId,
    })

    return { consultation }
  }
}
