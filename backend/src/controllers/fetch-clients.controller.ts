import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { FetchClientsService } from 'src/services/fetch-clients.service'
import { fetchClientsApiResponse } from 'src/swagger/clients/fetch-clients-api'

@ApiTags('Clientes')
@Controller('/clients/')
export class FetchClientsController {
  constructor(private fetchClientsService: FetchClientsService) {}

  @Get()
  @HttpCode(200)
  @ApiResponse(fetchClientsApiResponse)
  @UseGuards(JwtAuthGuard)
  async handle() {
    const clients = await this.fetchClientsService.execute()

    return { clients }
  }
}
