import { AppModule } from "./app.module"
import { NestFactory } from "@nestjs/core"
import { useContainer } from "class-validator"
import { AppConfigService } from "./config/app/config.service"
import { NestExpressApplication } from "@nestjs/platform-express"

import { ResponseInterceptor } from "./common/interceptors/response.interceptor"

import { HttpExceptionFilter } from "./common/exceptions/filters/http.exception"

import {
  DocumentBuilder,
  SwaggerModule
} from "@nestjs/swagger"

import {
  ValidationPipe,
  VersioningType
} from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //@TODO for production mode turn off some of the logger option
    logger: ['log', 'warn', 'error', 'debug', 'fatal', 'verbose'],
    cors: true,
  });

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  // Get app config for cors settings and starting the app.
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix(appConfig.prefix);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
  );

  useContainer(
      app.select(AppModule),
      { fallbackOnErrors: true }
  );

  const options = new DocumentBuilder()
      .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          'JWT',
      )
      .setTitle(appConfig.name)
      .setDescription(appConfig.description)
      .setVersion(appConfig.systemVersion)
      .addTag(appConfig.name)
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.port);
}
bootstrap();
