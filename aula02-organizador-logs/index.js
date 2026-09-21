// index.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatLog } from './utils.js';

// Obtenção do caminho do diretório atual em ambiente ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function salvarLogSystema(mensagemLog) {
  try {
    // Definindo o caminho absoluto do diretório 'logs'
    const pastaLogs = path.join(__dirname, 'logs');
    const arquivoLog = path.join(pastaLogs, 'system.log');

    // Cria a pasta de logs caso ela não exista
    await fs.mkdir(pastaLogs, { recursive: true });

    // Formata e insere o log no arquivo
    const registroFormatado = formatLog(mensagemLog);
    await fs.appendFile(arquivoLog, registroFormatado, 'utf-8');

    console.log('Log registrado com sucesso!');
  } catch (erro) {
    console.error('Erro ao escrever o arquivo de log:', erro);
  }
}

salvarLogSystema('Inicialização do servidor concluída.');
salvarLogSystema('Conexão ao banco de dados estabelecida.');