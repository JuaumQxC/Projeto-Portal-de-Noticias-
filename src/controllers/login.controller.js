import * as service from '../services/login.service.js'
import { ErroDeValidacao } from '../services/login.service.js'

export async function loginAtual(req, res) {
    const idusario = req.body.id
    const senhaUsuario = req.body.senha

    try {
        const logado = await service.login(idusario, senhaUsuario)
        if (logado !== true) {
            throw new Error("Ocorreu um erro ao logar.", erro.message)
        }
        res.status(200).json('Logado com sucesso')
    } catch (error) {
        if (error instanceof ErroDeValidacao) {
            return res.status(400).json({ error: error.message });
        }
        console.error(error);
        res.status(500).json({ error: 'Erro interno ao criar a usuarios.' });
    }
}
