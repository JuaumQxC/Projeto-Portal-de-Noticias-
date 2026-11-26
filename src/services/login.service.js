import * as model from '../models/usuarios.model.js';
import { sessaoLogin } from '../middleware/MiddlewareLogin.js';

export class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroDeValidacao';
  }
}

export async function login (id, senha){

    const usuario = await model.buscarPorId(id)

    if (!usuario){
        throw new ErroDeValidacao('usuário não encontrado.');
    }
    else if (usuario.senha != senha){
         throw new ErroDeValidacao('senha inválida.');
    }
    
    sessaoLogin.perfilAtual = usuario.perfil
    sessaoLogin.perfilNome = usuario.nome
    console.log(sessaoLogin)

    return true
}