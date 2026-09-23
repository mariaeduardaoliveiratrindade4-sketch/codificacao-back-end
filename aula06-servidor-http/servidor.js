const http = require('http');

const servidor = http.createServer((req, res) => {
    console.log(`[LOG] Método recebido: ${req.method} | Rota: ${req.url}`);

    const defaultHeaders = {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
    };

    if (req.url === '/status') {
        res.writeHead(200, {
            ...defaultHeaders,
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({ servidor: 'online' }));
    } else {
        res.writeHead(404, {
            ...defaultHeaders,
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({ erro: 'Página não encontrada' }));
    }
});

servidor.listen(3000, () => {
    console.log('Sentinela ativo na porta 3000!');
});