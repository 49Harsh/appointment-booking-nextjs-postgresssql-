import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Appointment, appointment => appointment.service)
  appointments: Appointment[];
}
