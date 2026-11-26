// import { perfilAtual, perfilNome } from "../services/login.service.js"

export let sessaoLogin = {
    perfilAtual: null,
    perfilNome: null
}

// export async function loginAtual (req, res){
//     const idusario = req.body.id
//     const senhaUsuario = req.body.senha

//     const encontrarUsuario = await model.buscarPorId(idusario)
    
//     if (!encontrarUsuario){
//         return res.status(404).json({erro: 'Usuário não encontrado.'})
//     }
//     else if (encontrarUsuario.senha != senhaUsuario){
//         return res.status(404).json({erro: 'Senha inválida.'})
//     }

//     perfilAtual = encontrarUsuario.pefil
//     perfilNome = encontrarUsuario.nome    
//     res.status(200).json('Logado com sucesso')
// }

export async function moderadorCheck(req, res, next) {
    if (perfilAtual != 'moderador'){
        return res.status(401).json('Você não possui permissão para ver a lista de usuários.')
    }
    next()

}

export async function autorCheck(req, res, next) {
    if (perfilAtual != 'autor'){
        return res.status(401).json('Você não possui permissão para alterar/ver esta noticia.')
    }
    next()

}

export async function autorPrivado(req, res, next){

}