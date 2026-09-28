import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ConvidadosService {
  private convidados = [
    { id: 1, nome: 'Ana', idade: 25 },
    { id: 2, nome: 'Bruno', idade: 30 },
  ];

  findAll() {
    return this.convidados;
  }

  findOne(id: number) {
    const convidado = this.convidados.find((c) => c.id === id);

    if (!convidado) {
      throw new NotFoundException(
        `Convidado com ID ${id} não encontrado`,
      );
    }

    return convidado;
  }

  updateIdade(id: number, idade: number) {
    const convidado = this.findOne(id);

    convidado.idade = idade;

    return convidado;
  }

  remove(id: number) {
    const index = this.convidados.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(
        `Convidado com ID ${id} não encontrado`,
      );
    }

    this.convidados.splice(index, 1);
  }
}