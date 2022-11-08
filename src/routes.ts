import { Router } from 'express'
import { CategoriaController } from './controllers/CategoriaController'
import { UsuarioController } from './controllers/UsuarioController'

const routes = Router()

routes.post('/Categoria', new CategoriaController().create)
routes.post('/filme/:idCategoria/create', new CategoriaController().createFilme)
routes.get('/Categoria', new CategoriaController().list)

routes.post('/CriarUsuario', new UsuarioController().create)
routes.delete('/DeletarUsuario/:id', new UsuarioController().delete)

export default routes