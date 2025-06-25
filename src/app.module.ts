import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { User } from './entities/user.entity';
import { Service } from './entities/service.entity';
import { Appointment } from './entities/appointment.entity';

import { UserService } from './services/user.service';
import { ServiceService } from './services/service.service';
import { AppointmentService } from './services/appointment.service';

import { UserController } from './controllers/user.controller';
import { ServiceController } from './controllers/service.controller';
import { AppointmentController } from './controllers/appointment.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Service, Appointment],
        synchronize: true, // Don't use this in production
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Service, Appointment]),
    ScheduleModule.forRoot(),
  ],
  controllers: [UserController, ServiceController, AppointmentController],
  providers: [UserService, ServiceService, AppointmentService],
})
export class AppModule {}
