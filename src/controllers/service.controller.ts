import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ServiceService } from '../services/service.service';
import { Service } from '../entities/service.entity';
import { CreateServiceDto } from '../dtos/service.dto';

@ApiTags('services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiCreatedResponse({ type: Service })
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return await this.serviceService.create(createServiceDto);
  }

  @Get()
  @ApiOkResponse({ type: [Service] })
  async findAll(): Promise<Service[]> {
    return await this.serviceService.findAll();
  }
}
