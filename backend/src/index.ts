import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';
import categoryRoutes from './routes/categoryRoutes'; // Adicionado
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes); 

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: ['items', 'categories']
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Rotas disponíveis:`);
  console.log(`   GET    /api/items`);
  console.log(`   GET    /api/categories`);
  console.log(`   GET    /health`);
});