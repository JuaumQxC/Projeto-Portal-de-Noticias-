// src/services/usuarios.service.js
import * as model from '../models/usuarios.model.js';
// import * as usuarioInfo from '../middleware/MiddlewareLogin.js'
// usuarioInfo.perfilAtual
export class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroDeValidacao';
  }
}

// O MongoDB guarda o identificador em `_id` (ObjectId). A API expõe `id` como texto, e é isso que este formato devolve.
function usuarioAtributos(usuario) {
  return {
    id: usuario._id.toHexString(),
    nome: usuario.nome,
    perfil: usuario.perfil,
    senha: usuario.senha,
    privado: usuario.privado
  };
}

export async function listar() {
  const listaUsuario = await model.buscarTodas();
  return listaUsuario.map(usuarioAtributos);
}

export async function criar({ id, nome, perfil, senha, privado }) {
  if (typeof nome !== 'string' || nome.trim().length < 3) {
    throw new ErroDeValidacao('O nome de usuário deve ter ao menos 3 caracteres.');
  }
  if (typeof perfil !== 'string' || perfil.trim().length < 5) {
    throw new ErroDeValidacao('você não inseriu um perfil válido.');
  }
  if (typeof senha !== 'string' || senha.trim().length < 6) {
    throw new ErroDeValidacao('A senha deve ter ao menos 6 caracteres.');
  }
  if (typeof privado !== 'boolean') {
    throw new ErroDeValidacao('você não definiu a privacidade do seu perfil.');
  }
  const novoUsuario = { nome: nome.trim(), perfil: perfil.trim(), senha: senha.trim(), privado: privado };
  const insertedId = await model.inserir(novoUsuario);
  return usuarioAtributos({ _id: insertedId, ...novoUsuario });
}