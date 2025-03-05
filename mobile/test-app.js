import express from 'express';
import { networkInterfaces } from 'os';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import open from 'open';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3030;

// Serve static files
app.use(express.static(__dirname));

// API para obter o IP local
app.get('/api/get-local-ip', (req, res) => {
  const nets = networkInterfaces();
  let localIP = '127.0.0.1';
  
  // Tenta encontrar um IP não interno
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Pula IPs internos e não IPv4
      if (net.family === 'IPv4' && !net.internal) {
        localIP = net.address;
      }
    }
  }
  
  res.json({ ip: localIP });
});

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'web-test.html'));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor QR Code rodando em http://localhost:${port}`);
  console.log('Abrindo navegador automaticamente...');
  
  // Tenta abrir o navegador automaticamente
  open(`http://localhost:${port}`).catch(() => {
    console.log(`Por favor, abra manualmente: http://localhost:${port}`);
  });
});
