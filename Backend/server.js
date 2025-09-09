const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORS
const path = require('path');

const app = express();

// Railway define a porta automaticamente
const port = process.env.PORT || 3000;

// Para permitir receber JSON nas requisições
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos do Frontend
app.use(express.static(path.join(__dirname, '../Frontend')));

// Rota principal -> abre o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
