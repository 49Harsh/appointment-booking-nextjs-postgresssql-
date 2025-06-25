import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '../dtos/appointment.dto';
import { UserService } from './user.service';
import { ServiceService } from './service.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly userService: UserService,
    private readonly serviceService: ServiceService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const user = await this.userService.findOne(createAppointmentDto.userId);
    const service = await this.serviceService.findOne(createAppointmentDto.serviceId);

    const appointment = this.appointmentRepository.create({
      user,
      service,
      scheduledAt: new Date(createAppointmentDto.scheduledAt),
    });

    return await this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      relations: ['user', 'service'],
    });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['user', 'service'],
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async cancel(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);
    if (appointment.status !== AppointmentStatus.BOOKED) {
      throw new BadRequestException('Cannot cancel a non-booked appointment');
    }
    appointment.status = AppointmentStatus.CANCELLED;
    return await this.appointmentRepository.save(appointment);
  }

  async complete(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);
    if (appointment.status !== AppointmentStatus.BOOKED) {
      throw new BadRequestException('Cannot complete a non-booked appointment');
    }
    appointment.status = AppointmentStatus.COMPLETED;
    return await this.appointmentRepository.save(appointment);
  }
}
