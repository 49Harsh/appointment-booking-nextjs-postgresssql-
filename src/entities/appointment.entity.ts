import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Service } from './service.entity';

export enum AppointmentStatus {
  BOOKED = 'booked',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.appointments)
  user: User;

  @ManyToOne(() => Service, service => service.appointments)
  service: Service;

  @Column()
  scheduledAt: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.BOOKED,
  })
  status: AppointmentStatus;

  @CreateDateColumn()
  createdAt: Date;
}
