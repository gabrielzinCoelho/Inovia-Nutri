import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { EnvSchema } from './env'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { swaggerDocumentOptions } from './swagger/swagger-document-options'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const configService: ConfigService<EnvSchema, true> = app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })

  const config = new DocumentBuilder()
    .setTitle('Inovia Nutri - API')
    .setDescription('Descrição da API RESTful referente ao app Inovia Nutri.')
    .setVersion('1.0')
    .build()
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, swaggerDocumentOptions)
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
  })

  await app.listen(port)
}
bootstrap()
