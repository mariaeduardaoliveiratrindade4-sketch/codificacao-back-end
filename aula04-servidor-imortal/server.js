import express from 'express';

const app = express();

app.use(express.json());

// 1. LISTENERS DE PROCESSO GLOBAL
process.on('uncaughtException', (err) => {
  console.error('[ERRO DE PROCESSO - uncaughtException]:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('[PROMISE REJEITADA - unhandledRejection]:', reason);
});

// 2. ROTAS SIMULADAS

app.get('/sucesso', (req, res) => {
  res.json({
    success: true,
    message: 'Operação realizada com sucesso!'
  });
});

// Rota com erro síncrono tratado via try/catch
app.get('/erro-sincrono', (req, res, next) => {
  try {
    throw new Error('Falha ao processar a regra de negócio.');
  } catch (erro) {
    next(erro);
  }
});

// Rota com erro em operação assíncrona
app.get('/erro-assincrono', async (req, res, next) => {
  try {
    await Promise.reject(
      new Error('Erro na consulta com banco de dados externo.')
    );
  } catch (erro) {
    next(erro);
  }
});

// 3. MIDDLEWARE CENTRALIZADO DE TRATAMENTO DE ERROS
app.use((err, req, res, next) => {
  console.error(`[LOG DE ERRO INTERNO]: ${err.stack}`);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Erro interno do servidor'
  });
});

app.listen(3000, () => {
  console.log('Servidor Imortal rodando na porta 3000');
});