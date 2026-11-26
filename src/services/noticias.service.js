// src/services/noticias.service.js
import * as model from '../models/noticias.model.js';

let perfilAtual;
let perfilNome;

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
    autor: perfilNome,
    comentarios : noticia.comentarios,
    status: noticia.status,
  };
}

export async function listar() {
  const documentos = await model.buscarTodas();
  return documentos.map(noticiaAtributos);
}

export async function criar({nome, cidade, autor, comentarios, status  }) {

  if (typeof nome !== 'string' || nome.trim().length < 3) {
    throw new ErroDeValidacao('O nome da noticia deve ter ao menos 3 caracteres.');
  }

  if (typeof cidade !== 'string' || cidade.trim().length < 3) {
    throw new ErroDeValidacao('O  deve ter ao menos 3 caracteres.');
  }
  
  if (typeof autor !== 'string' || perfilNome == undefined) {
    throw new ErroDeValidacao('Erro. Você não está logado.');
  }

  if (typeof status !== 'string' || status != "publicado" || status != "rascunho") {
    throw new ErroDeValidacao('O título deve ter ao menos 3 caracteres.');
  }
  const novaTarefa = { nome: nome.trim(), cidade: cidade.trim(), autor: perfilNome, comentarios: [], status: status.trim()};
  const insertedId = await model.inserir(novaTarefa);
  return noticiaAtributos({ _id: insertedId, ...novaTarefa });
}