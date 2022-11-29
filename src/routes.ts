import { Router } from 'express'
import { CategoriaController } from './controllers/CategoriaController'
import { UsuarioController } from './controllers/UsuarioController'

const routes = Router()

routes.post('/Categoria', new CategoriaController().create)
routes.get('/listarCategoria/:idCategoria', new CategoriaController().listCategoria)
routes.put('/atualizarCategoria/:idCategoria', new CategoriaController().updateCategory)
routes.delete('/deletarCategoria/:idCategoria', new CategoriaController().deleteCategory)

routes.post('/filme/:idCategoria/create', new CategoriaController().createFilme)
routes.get('/listarFilme', new CategoriaController().listarFilme)
routes.put('/atualizarFilme/:idFilme', new CategoriaController().updateFilme)
routes.get('/listarFilmes', new CategoriaController().listAll)
routes.delete('/deletarFilme/:idFilme', new CategoriaController().deleteFilme)

routes.post('/CriarUsuario', new UsuarioController().create)
routes.delete('/DeletarUsuario/:id', new UsuarioController().delete)
routes.put('/usuarios/:id', new UsuarioController().update)
routes.get('/listaUsuarios', new UsuarioController().listar)

routes.post('/login', new UsuarioController().login)

export default routes