const express = require('express');
const app = express();
const PORT = 3000;

let usuarios = [
    {
        nome: "João Augusto",
        id: "123456789"
    }
]

let comentarios = [
    {
        autor: "Jacinto Leite Aquino Rego",
        desc: "TOMA NO CU JOAO, SEU MENTIROSO DO CARAIO, NÃO TEM PORRA NENUMA DE CHUPACU AQUI NAO, SEU FUDIDO DE MERDA"
    }
]

let noticias = [ 
    {
        nome: "Chupacu avistado em plena luz do dia em Amapá",
        cidade: "Amapá",
        autor: "João Augusto",
        comentPost: ""
        
    }
]

app.get('/', (req, res) => {
  res.send('Bem-vindo ao PORTAL ZACARIAS!!!');
});

app.get('/autor', (req, res) => {
    res.json(noticias);
})

app.post('/noticia', (req, res) => {
    const novaNoticia = {
        nome: '',
        cidade: '',
        autor: '',
        comentPost: ''
    };
    noticias.push(novaNoticia);
    res.status(201).json(noticias);
})

app.get('/usuario', (req, res) => {
    res.json(noticias);
})

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`
    );
});

// 404 aviso genérico de erro - deve ser a última rota :)
app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada'
    });
});