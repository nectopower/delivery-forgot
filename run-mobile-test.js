import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Iniciando Expo em modo offline...');

// Comando para iniciar o Expo em modo offline (apenas com a flag --offline)
const expoProcess = spawn('npx', ['expo', 'start', '--offline'], {
  cwd: join(__dirname, 'mobile'),
  stdio: 'inherit',
  shell: true
});

expoProcess.on('error', (err) => {
  console.error('Erro ao iniciar o Expo:', err);
});

expoProcess.on('close', (code) => {
  if (code !== 0) {
    console.log(`O processo Expo encerrou com código ${code}`);
  }
});
