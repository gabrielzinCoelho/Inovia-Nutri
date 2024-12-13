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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Consultation.name, schema: ConsultationSchema },
    ]),
    ClientModule,
    NutritionistModule,
  ],
  controllers: [CreateConsultationController],
  providers: [CreateConsultationService, IsConsultationOverlappingService],
  exports: [MongooseModule],
})
export class ConsultationModule {}
