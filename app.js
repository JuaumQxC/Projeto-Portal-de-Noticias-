const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url, req.headers['content-type'], req.body, perfilAtual, perfilNome);
  next();
});

let usuarios = [
    {
        nome: "João Augusto",
        id: "123456789",
        perfil: "autor",
        senha: "wo2342"
    },
    {
        nome: "Flávio Bolsonaro",
        id: "672255891",
        perfil: "leitor",
        senha: "22PTM3RDA"
    },
    {
        nome: "Lula",
        id: "131313131",
        perfil: "leitor",
        senha: "P1CANHAG02T02A"
    },
    {
        nome: "Jorge Lucas",
        id: "229979771",
        perfil: "autor",
        senha: "041012"
    }
]


let noticias = [ 
    {
        id: 1,
        nome: "Chupacu avistado em plena luz do dia em Amapá",
        cidade: "Amapá",
        autor: "João Augusto",
        comentarios: ["TOMA NO CU JOAO, SEU MENTIROSO DO CARAIO, NÃO TEM PORRA NENUMA DE CHUPACU AQUI NAO, SEU FUDIDO DE MERDA",],
        status: "publicado"
    },

    {
        id: 2,
        nome: "Streamer famoso 'Rato' come pão com nescau na chapa de uma lanchonete e é encontrado morto e branco duas horas após sua live",
        cidade: "Xique-xique",
        autor: "Jorge Lucas",
        comentarios: [],
        status: "rascunho"
    }
]

let perfilAtual = "autor";
let usuario;
let perfilNome = "Jorge Lucas";

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
perfilNome = usuario.nome
})

app.get('/noticias', (req, res) => {
    const noticiasPub = noticias.filter(noticias => noticias.status == "publicado")
    res.json(noticiasPub)
})

app.post('/noticias/criacao', (req, res) => {
    if (perfilAtual != "autor"){
        return res.status(401).json({ erro: 'Você não tem permissão para criar uma notícia.'})
    }

    const nome = req.body.nome;
    const cidade = req.body.cidade;
    const autor = req.body.autor;
    const status = req.body.status;

    if(!nome || typeof nome !== 'string'){
        return res.status(400).json({ erro: 'O nome é obrigatorio e tem que ser uma string' });
    }

    if(!cidade || typeof cidade !== 'string'){
        return res.status(400).json({ erro: 'A cidade é obrigatorio e tem que ser uma string' });
    }

    if(!autor || typeof autor !== 'string'){
        return res.status(400).json({ erro: 'O autor é obrigatorio e tem que ser uma string' });
    }

    if(!status || typeof status !== 'string'){
        return res.status(400).json({ erro: 'O status é obrigatorio e tem que ser uma string' });
    }

    const novaNoticia = {
        id: (noticias.length + 1),
        nome: nome,
        cidade: cidade,
        autor: autor,
        status: status
    }

    noticias.push(novaNoticia);

    res.status(201).json(novaNoticia);
})

app.get('/usuario', (req, res) => {
    res.json(usuarios);
})

app.post('/comentario/postar', (req, res) => {
    const {id} = req.query
    const comentario = req.body.comentario;

    if(!comentario || typeof comentario !== 'string'){
        return res.status(400).json({ erro: 'O comentario é obrigatorio e tem que ser uma string' });
    }

    noticias[Number(id) - 1].comentario.push(comentario);
    res.status(201).json({comentario: comentario});

})

app.get('/noticias/:id', (req, res) => {
    const {id} = req.params
    const notProcura = noticias.find(u => u.id === parseInt(id));
    
    if (!noticias) {
        return res.status(404).json({erro: "Nenhuma noticia com esse id identificada."})
    }
    res.json(notProcura)
})

app.post('/comentario/deletar', (req, res) => {
    if(perfilAtual != "moderador"){
        return res.status(401).json({ erro: 'Você não tem permissão para deletar um comentário.'})
    }
    
    const {id, comentario} = req.body
    
    if(!id || typeof id !== 'number' || !comentario || typeof comentario !== 'string'){
        return res.status(400).json({ erro: 'O id é obrigatorio e tem que ser um numero' });
    }

    const encontrar_id = noticias.filter((n) => n.id === id)

    if(encontrar_id.length === 0){
        return res.status(404).json({ erro: 'Noticia não encontrada' });
    }

    const noticia = encontrar_id[0];
    const indice = noticia.comentarios.indexOf(comentario);

    if(indice === -1){
        return res.status(404).json({ erro: 'Comentario não encontrado' });
    }

    noticia.comentarios.splice(indice, 1);
    res.status(200).json({mensagem: 'Comentario deletado com sucesso'})
});

app.post('/noticia/editar/:id', (req, res) => {
    const {id} = req.params
    const {nome, cidade, status} = req.body
    const autorNoticia= noticias.filter(noticias => noticias.autor == perfilNome)

    if (perfilAtual != "autor" && autorNoticia == []){
        res.status(404).json("Erro, você não possui acesso para alterar esta noticia")
    }

    if(!nome || typeof nome !== 'string'){
        return res.status(400).json({ erro: 'O nome é obrigatorio e tem que ser uma string' });
    }

    if(!cidade || typeof cidade !== 'string'){
        return res.status(400).json({ erro: 'O cidade é obrigatorio e tem que ser uma string' });
    }

    if(!status || typeof status !== 'string'){
        return res.status(400).json({ erro: 'O status é obrigatorio e tem que ser uma string' });
    }

    const edicaoNot = {
        id: id,
        nome: nome,
        cidade: cidade,
        status: status
    }

    noticias.splice(parseInt(id), 1, edicaoNot)
    
    res.status(201).json({edicaoNot})
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