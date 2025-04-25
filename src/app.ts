import express from 'express';
import router from './routes';
import cors from 'cors';
import { pool } from './Database'; // importa a conexão

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);

  // Testa a conexão ao banco quando iniciar o servidor
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Conexão com o banco bem-sucedida!');
    console.log('Horário do PostgreSQL:', result.rows[0].now);
  } catch (error) {
    console.error('Erro ao conectar no banco de dados:', error);
  }
});
