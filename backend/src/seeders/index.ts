import { seeder } from 'nestjs-seeder'
import { NutritionistSeeder } from './nutritionist.seeder'
import { AppModule } from 'src/app.module'
import { NutritionistModule } from 'src/modules/nutritionist.module'
import { BiotypeSeeder } from './biotype.seeder'
import { BiotypeModule } from 'src/modules/biotype.module'
import { ClientSeeder } from './client.seeder'
import { ClientModule } from 'src/modules/client.module'

seeder({
  imports: [AppModule, NutritionistModule, BiotypeModule, ClientModule],
}).run([NutritionistSeeder, BiotypeSeeder, ClientSeeder])
