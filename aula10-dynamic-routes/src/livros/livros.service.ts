import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LivrosService {
  private livros = [
    {
      id: 1,
      titulo: 'O Senhor dos Anéis',
      autor: 'J.R.R. Tolkien',
    },
    {
      id: 2,
      titulo: '1984',
      autor: 'George Orwell',
    },
    {
      id: 3,
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
    },
  ];

  findById(id: number) {
    const livro = this.livros.find((l) => l.id === id);

    if (!livro) {
      throw new NotFoundException(
        `Livro com ID ${id} não localizado em nosso acervo`,
      );
    }

    return livro;
  }
}