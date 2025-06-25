import { IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  serviceId: string;

  @ApiProperty({ example: '2025-06-25T10:00:00Z' })
  @IsDateString()
  scheduledAt: string;
}
