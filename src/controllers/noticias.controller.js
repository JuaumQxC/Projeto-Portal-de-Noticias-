// src/controllers/noticias.controller.js

import * as service from '../services/noticias.service.js';
import { ErroDeValidacao } from '../services/noticias.service.js';

export async function listar(req, res) {
  try {
    res.json(await service.listar());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao listar as noticias.' });
  }
}

export async function criar(req, res) {
  try {
    const noticias = await service.criar(req.body ?? {});
    res.status(201).json(noticias);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao criar a noticias.' });
  }
}

export async function buscarNoticia (req, res) {
  const {id} = req.params

  try {
    res.json(await service.procurarId(id))
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao procurar esta noticia.' });
  }

}