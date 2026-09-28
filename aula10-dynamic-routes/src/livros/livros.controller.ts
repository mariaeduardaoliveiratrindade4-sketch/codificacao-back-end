import { Controller, Get, Param } from '@nestjs/common';
import { LivrosService } from './livros.service.js';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    const numId = +id;

    return this.livrosService.findById(numId);
  }
}