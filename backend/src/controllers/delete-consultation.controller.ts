import {
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { DeleteConsultationService } from 'src/services/delete-consultation.service'
import { DeleteConsultationApiResponse } from 'src/swagger/consultations/delete-consultation-api'
import { IsValidObjectId } from 'src/validator/object-id.validator'

class DeleteConsultationDto {
  @ApiProperty({ required: true, example: '675cc10ac5464c094652f75f' })
  @IsValidObjectId()
  consultationId: string
}

@ApiTags('Consultas')
@Controller('/consultations/')
export class DeleteConsultationController {
  constructor(private deleteConsultationService: DeleteConsultationService) {}

  @Delete(':consultationId')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiResponse(DeleteConsultationApiResponse)
  @UseGuards(JwtAuthGuard)
  async handle(@Param() { consultationId }: DeleteConsultationDto) {
    const consultation = await this.deleteConsultationService.execute({
      id: consultationId,
    })

    return { consultation }
  }
}
