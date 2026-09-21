// processarLogs.js
import fs from 'fs';
import readline from 'readline';

function exibirConsumoMemoria(etapa) {
  const memoria = process.memoryUsage();
  const rssMB = (memoria.rss / 1024 / 1024).toFixed(2);
  const heapMB = (memoria.heapUsed / 1024 / 1024).toFixed(2);

  console.log(`[${etapa}] RSS: ${rssMB} MB | Heap Utilizado: ${heapMB} MB`);
}

async function filtrarErros() {
  console.log('Iniciando Processamento com Streams!');

  exibirConsumoMemoria('Início');

  const streamLeitura = fs.createReadStream('servidor.log');
  const streamEscrita = fs.createWriteStream('apenas_erros.log');

  const leitorLinhaALinha = readline.createInterface({
    input: streamLeitura,
    crlfDelay: Infinity
  });

  let totalErros = 0;

  for await (const linha of leitorLinhaALinha) {
    if (linha.includes('ERROR')) {
      streamEscrita.write(linha + '\n');
      totalErros++;
    }
  }

  exibirConsumoMemoria('Fim');

  console.log(
    `Processamento concluído! Quantidade de erros encontrados: ${totalErros} linhas`
  );
}

filtrarErros();