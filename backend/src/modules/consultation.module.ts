import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
  Consultation,
  ConsultationSchema,
} from 'src/schemas/consultation.schema'
import { CreateConsultationService } from 'src/services/create-consultation.service'
import { IsConsultationOverlappingService } from 'src/services/is-consultation-overlapping.service'
import { ClientModule } from './client.module'
import { NutritionistModule } from './nutritionist.module'
import { CreateConsultationController } from 'src/controllers/create-consultation.controller'
import { ShowConsultationService } from 'src/services/show-consultation.service'
import { ShowConsultationController } from 'src/controllers/show-consultation.controller'
import { BiotypeModule } from './biotype.module'
import { FetchConsultationsController } from 'src/controllers/fetch-consultations.controller'
import { FetchConsultationService } from 'src/services/fetch-consultation.service'
import { DeleteConsultationService } from 'src/services/delete-consultation.service'
import { DeleteConsultationController } from 'src/controllers/delete-consultation.controller'
import { UpdateConsultationService } from 'src/services/update-consultation.service'
import { UpdateConsultationController } from 'src/controllers/update-consultation.controller'
import { CreateRecurrentConsultationService } from 'src/services/create-recurrent-consultation.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Consultation.name, schema: ConsultationSchema },
    ]),
    ClientModule,
    NutritionistModule,
    BiotypeModule,
  ],
  controllers: [
    CreateConsultationController,
    ShowConsultationController,
    FetchConsultationsController,
    DeleteConsultationController,
    UpdateConsultationController,
  ],
  providers: [
    CreateConsultationService,
    CreateRecurrentConsultationService,
    IsConsultationOverlappingService,
    ShowConsultationService,
    FetchConsultationService,
    DeleteConsultationService,
    UpdateConsultationService,
  ],
  exports: [MongooseModule],
})
export class ConsultationModule {}
