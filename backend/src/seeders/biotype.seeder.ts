import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DataFactory, Seeder } from 'nestjs-seeder'
import { Biotype } from 'src/schemas/biotype.schema'

@Injectable()
export class BiotypeSeeder implements Seeder {
  constructor(
    @InjectModel(Biotype.name)
    private biotypeModel: Model<Biotype>,
  ) {}

  async seed(): Promise<any> {
    const seededBiotypes = [
      ...DataFactory.createForClass(Biotype).generate(1, {
        description: 'Ectomorfo',
      }),
      ...DataFactory.createForClass(Biotype).generate(1, {
        description: 'Mesomorfo',
      }),
      ...DataFactory.createForClass(Biotype).generate(1, {
        description: 'Endomorfo',
      }),
    ]
    return await this.biotypeModel.insertMany(seededBiotypes)
  }

  async drop(): Promise<any> {
    return this.biotypeModel.deleteMany({})
  }
}
