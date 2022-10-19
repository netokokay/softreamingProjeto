import { Router } from 'express'
import { CategoriaController } from './controllers/CategoriaController'

const routes = Router()

routes.post('/Categoria', new CategoriaController().create)
routes.post('/filme/:idCategoria/create', new CategoriaController().createFilme)
routes.get('/Categoria', new CategoriaController().list)

export default routes