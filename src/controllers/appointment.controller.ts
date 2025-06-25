import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '../dtos/appointment.dto';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiCreatedResponse({ type: Appointment })
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return await this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  @ApiOkResponse({ type: [Appointment] })
  async findAll(): Promise<Appointment[]> {
    return await this.appointmentService.findAll();
  }

  @Put(':id/cancel')
  @ApiOkResponse({ type: Appointment })
  async cancel(@Param('id') id: string): Promise<Appointment> {
    return await this.appointmentService.cancel(id);
  }

  @Put(':id/complete')
  @ApiOkResponse({ type: Appointment })
  async complete(@Param('id') id: string): Promise<Appointment> {
    return await this.appointmentService.complete(id);
  }
}
