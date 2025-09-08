const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORS

const app = express(); //Cria o servidor

const port = 3000; //Variavel para armazenar a porta

const path = require('path');

//Para permitir receber json nas requisições
app.use(express.json());
app.use(cors());


//request - requisição
//response - respota
app.use(
     express.static(
        path.join(__dirname, '../Frontend')
       )
    );










app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3000");
})