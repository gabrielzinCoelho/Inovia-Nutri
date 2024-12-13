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
  ],
  providers: [
    CreateConsultationService,
    IsConsultationOverlappingService,
    ShowConsultationService,
    FetchConsultationService,
  ],
  exports: [MongooseModule],
})
export class ConsultationModule {}
