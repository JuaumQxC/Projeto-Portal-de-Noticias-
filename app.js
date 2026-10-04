const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url, req.headers['content-type'], req.body, perfilAtual);
  next();
});

let usuarios = [
    {
        nome: "João Augusto",
        id: "123456789",
        perfil: "leitor",
        senha: "wo2342"
    },
    {
        nome: "Flávio Bolsonaro",
        id: "672255891",
        perfil: "autor",
        senha: "22PTM3RDA"
    },
    {
        nome: "Lula",
        id: "131313131",
        perfil: "autor",
        senha: "P1CANHAG02T02A"
    }
]


let noticias = [ 
    {
        nome: "Chupacu avistado em plena luz do dia em Amapá",
        cidade: "Amapá",
        autor: "João Augusto",
        comentario: ["TOMA NO CU JOAO, SEU MENTIROSO DO CARAIO, NÃO TEM PORRA NENUMA DE CHUPACU AQUI NAO, SEU FUDIDO DE MERDA",]
        
    }
]

let perfilAtual;

app.get('/', (req, res) => {
  res.send('Bem-vindo ao PORTAL ZACARIAS!!!');
});


app.post('/login', (req, res) => {
    const id = req.body.id;
    const senha = req.body.senha

    const encontrar = usuarios.filter((u) => u.id === id && u.senha === senha)

if(encontrar.length === 0){
    return res.status(404).json({ erro: 'Usuario não encontrado' });
}

const usuario = encontrar[0];

res.status(200).json({nome: usuario.nome, perfil: usuario.perfil});

perfilAtual = usuario.perfil
})

app.get('/noticias', (req, res) => {
    res.json(noticias);
})

app.post('/noticias/criacao', (req, res) => {
    const nome = req.body.nome;
    const cidade = req.body.cidade;
    const autor = req.body.autor;
    // const comentario = req.body.comentario;

    if(!nome || typeof nome !== 'string'){
        return res.status(400).json({ erro: 'O nome é obrigatorio e tem que ser uma string' });
    }

    if(!cidade || typeof cidade !== 'string'){
        return res.status(400).json({ erro: 'A cidade é obrigatorio e tem que ser uma string' });
    }

    if(!autor || typeof autor !== 'string'){
        return res.status(400).json({ erro: 'O autor é obrigatorio e tem que ser uma string' });
    }

    // if(!comentario || typeof comentario !== 'string'){
    //     return res.status(400).json({ erro: 'O comentario é obrigatorio e tem que ser uma string' });
    // }

    const novaNoticia = {
        nome: nome,
        cidade: cidade,
        autor: autor,
        // comentario: [comentario]
    }

    noticias.push(novaNoticia);

    res.status(201).json(novaNoticia);
})

app.get('/usuario', (req, res) => {
    res.json(usuarios);
})

app.post('/comentario/postar', (req, res) => {
    const comentario = req.body.comentario;

    if(!comentario || typeof comentario !== 'string'){
        return res.status(400).json({ erro: 'O comentario é obrigatorio e tem que ser uma string' });
    }

})

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`
    );
});

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada'
    });
});