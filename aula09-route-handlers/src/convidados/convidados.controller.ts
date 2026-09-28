import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';

import { ConvidadosService } from './convidados.service.js'

@Controller('convidados')
export class ConvidadosController {
  constructor(private readonly convidadosService: ConvidadosService) {}

  @Get()
  listar() {
    return this.convidadosService.findAll();
  }

  @Patch(':id')
  atualizarIdade(
    @Param('id') id: string,
    @Body('idade') idade: number,
  ) {
    console.log(`[GESTOR] Atualizando idade do ID: ${id}`);

    return this.convidadosService.updateIdade(+id, idade);
  }

  @Delete(':id')
  @HttpCode(204)
  remover(@Param('id') id: string) {
    console.log(`[GESTOR] Removendo convidado ID: ${id}`);

    this.convidadosService.remove(+id);
  }
}