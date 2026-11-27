import express from 'express'
import noticiasRoutes from './routes/noticias.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import { sessaoLogin} from './middleware/MiddlewareLogin.js'
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.json({message: "Bem vindo ao portal"})
})

// app.use((req, res, next) => {
//   console.log(sessaoLogin.perfilAtual, sessaoLogin.perfilNome );
//   next();
// });

app.use('/noticias', noticiasRoutes)
app.use('/usuarios', usuariosRoutes)

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada'
    });
})

export default app;
