import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { FetchNutritionistsService } from 'src/services/fetch-nutritionists.service'
import { fetchNutritionistsApiResponse } from 'src/swagger/nutritionist/fetch-nutritionists-api'

@ApiTags('Nutricionistas')
@Controller('/nutritionists/')
export class FetchNutritionistsController {
  constructor(private fetchNutritionistsService: FetchNutritionistsService) {}

  @Get()
  @HttpCode(200)
  @ApiResponse(fetchNutritionistsApiResponse)
  @UseGuards(JwtAuthGuard)
  async handle() {
    const nutritionists = await this.fetchNutritionistsService.execute()

    return { nutritionists }
  }
}
