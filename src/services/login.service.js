import * as model from '../models/usuarios.model.js';

export let perfilAtual;
export let perfilNome;

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
    
    perfilAtual = usuario.perfil
    perfilNome = usuario.nome
    console.log(perfilAtual, perfilNome)

    return true
}