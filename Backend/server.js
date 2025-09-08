const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORS

const app = express(); //Cria o servidor

const port = 3000; //Variavel para armazenar a porta

const path = require('path');

//Para permitir receber json nas requisições
app.use(express.json());
app.use(cors());

const usuarios = [
    { "id": 1, "nome": "Gaby", "idade": 18, "senha": "1708" },
    { "id": 2, "nome": "kawã", "idade": 18, "senha": "1708" }
]
let nextID = 3;
//request - requisição
//response - respota
app.use(
     express.static(
        path.join(__dirname, '../Frontend')
       )
    );

//Buscar todos os usuários
app.get("/usuarios", (req, res) => {
    //send -> envia os dados
    res.send(usuarios);
})

//Buscar um usuário -> get by id
app.get("/usuarios/:id", (req, res) => {
    //params - parametros da requisição (fica na url)
    const id = parseInt(req.params.id);

    const usuario = usuarios.find(usuario => usuario.id == id);

    if (usuario != null) {
        res.send(usuario)
    } else {
        res.status(404).send("Usuário não encontrado!")
    }
})

//Criar um usuário
app.post("/usuarios", (req, res) => {
    //body - corpo da requisição
    const novoUsuario = req.body;
    novoUsuario.id = nextID ++ ;
    usuarios.push(novoUsuario);

    res.status(201).send(novoUsuario)
})

//Atualizar um usuário
app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const novoUsuario = req.body;
    novoUsuario.id = id;
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if (index != null) {
        usuarios[index] = novoUsuario;
        res.status(200).send(novoUsuario);
    } else {
        res.status(404).send("Usuário não encontrado!")
    }

})

//Deletar um usuário
app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if (index != null) {


        
        usuarios.splice(index, 1);
        res.status(204).send("Usuário com id:" + id + " removido com sucesso!")
    } else {
        res.status(404).send("Usuário não encontrado!")
    }
})

app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3000");
})