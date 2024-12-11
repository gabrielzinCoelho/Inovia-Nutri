import { seeder } from 'nestjs-seeder'
import { NutritionistSeeder } from './nutritionist.seeder'
import { NutritionistModule } from 'src/modules/nutritionist.module'
import { AppModule } from 'src/app.module'

seeder({
  imports: [AppModule, NutritionistModule],
}).run([NutritionistSeeder])
