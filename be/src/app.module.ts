import './boilerplate.polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';
import { MqttModule } from 'nest-mqtt';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
// import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
// import { PostModule } from './modules/post/post.module';
// import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';
import { CamerasModule } from './modules/cameras/cameras.module';
import { StorageModule, DriverType, StorageService } from '@codebrew/nestjs-storage';
import { FilesystemModule } from './modules/filesystem/filesystem.module'

@Module({
  imports: [
    // AuthModule,
    // UserModule,
    // PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    /* TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
    }), */
    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: configService.isDevelopment,
        },
      }),
      imports: [SharedModule],
      parser: I18nJsonParser,
      inject: [ApiConfigService],
    }),
    HealthCheckerModule,
    CamerasModule,
    MqttModule.forRootAsync({
        inject: [ApiConfigService], useFactory: (configService: ApiConfigService) => { 
            const options = configService.mqttConfig;
            return {
                host: options.host, port: options.port
            }

    }}),
    StorageModule.forRoot({
        default: 'shots',
        disks: {
            shots: {
            driver: DriverType.LOCAL,
            config: {
              root: path.join(__dirname, '..', 'public','shots'),
            },
          },
        },
      }),
      FilesystemModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },      
  ],
  controllers: [AppController,]
})
export class AppModule {}
