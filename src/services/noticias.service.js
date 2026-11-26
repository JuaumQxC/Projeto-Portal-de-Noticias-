// src/services/noticias.service.js
import * as model from '../models/noticias.model.js';
import { sessaoLogin } from '../middleware/MiddlewareLogin.js';

export class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroDeValidacao';
  }
}

// O MongoDB guarda o identificador em `_id` (ObjectId). A API expõe `id` como texto, e é isso que este formato devolve.
function noticiaAtributos(noticia) {
  return {
    _id: noticia._id.toHexString(),
    nome: noticia.nome,
    cidade: noticia.cidade,
    autor: noticia.autor,
    comentarios : noticia.comentarios,
    status: noticia.status,
  };
}

export async function listar() {
  const noticias = await model.buscarTodas();
  return noticias.map(noticiaAtributos);
}

export async function criar({nome, cidade, status }) {

  if (typeof nome !== 'string' || nome.trim().length < 3) {
    throw new ErroDeValidacao('O nome da noticia deve ter ao menos 3 caracteres.');
  }

  if (typeof cidade !== 'string' || cidade.trim().length < 3) {
    throw new ErroDeValidacao('O  deve ter ao menos 3 caracteres.');
  }

  if (typeof status !== 'string' || status != "publicado" && status != "rascunho") {
    throw new ErroDeValidacao('Defina o status da sua noticia.');
  }

  if (sessaoLogin.perfilNome == null || sessaoLogin.perfilAtual != "autor") {
    throw new ErroDeValidacao('Você não está logado e/ou não possui permissão para criar noticias.');
  }
  const novaNoticia = { nome: nome.trim(), cidade: cidade.trim(), autor: sessaoLogin.perfilNome, comentarios: [], status: status.trim()};
  const insertedId = await model.inserir(novaNoticia);
  return noticiaAtributos({ _id: insertedId, ...novaNoticia });
}

export async function procurarId(id) {
  let notProcura = await model.buscarPorId(id)

  if (notProcura == undefined) {
    throw new ErroDeValidacao("Não foi possível localizar esta noticia.");
    
  }
  return notProcura
}

export async function deletar(id){
  let deletaNot = model.remover(id)

  if (!deletaNot){
    throw new ErroDeValidacao('Não foi achado nenhuma noticia com esse id.')
  }

  return 'noticia deletada.'
}

export async function editar(id, nome, cidade, status){
  let notProcura = await model.buscarPorId(id)

  if (notProcura == undefined) {
    throw new ErroDeValidacao("Não foi possível localizar esta noticia.");
    
  }

  if (typeof nome !== 'string' || nome.trim().length < 3) {
    throw new ErroDeValidacao('O nome da noticia deve ter ao menos 3 caracteres.');
  }

  if (typeof cidade !== 'string' || cidade.trim().length < 3) {
    throw new ErroDeValidacao('O  deve ter ao menos 3 caracteres.');
  }

  if (typeof status !== 'string' || status != "publicado" && status != "rascunho") {
    throw new ErroDeValidacao('Defina o status da sua noticia.');
  }

  if (sessaoLogin.perfilAtual != "autor" && notProcura.autor != sessaoLogin.perfilNome) {
    throw new ErroDeValidacao('Você não possui permissão para editar esta noticia.');
  }
  const novaNoticia = { nome: nome.trim(), cidade: cidade.trim(), autor: sessaoLogin.perfilNome, comentarios: [], status: status.trim()};

  let edicaoNot = await model.atualizar(id, novaNoticia)

  if (!edicaoNot){
    throw new ErroDeValidacao('noticia não encontrada.')
  }

  return 'noticia editada com sucesso'
}

export async function comentario(){

}