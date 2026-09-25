import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateConvidadoDto } from './dto/create-convidado.dto';

@Controller('convidados')
export class ConvidadosController {
    @Get()
    listarTodos() {
        return ['Ana', 'Bruno', 'Carlos'];
    }

    @Post()
    criar(@Body() createConvidadoDto: CreateConvidadoDto) {
        console.log(`[PORTEIRO DIGITAL] Novo convidado recebido: ${createConvidadoDto.nome}`);

        return {
            mensagem: `Convidado ${createConvidadoDto.nome} adicionado com sucesso!`,
            dados: createConvidadoDto,
        };
    }
}