import { Server } from './server'
import { usersRouter } from '../users/users.router'
import { ProdutoRouter } from '../produto/produto.router'
import { CompraRouter } from '../compra/compra.router'
import { mainRouter } from '../main.router'

const server = new Server()

export const initServer = () => {
    server.bootstrap([
        mainRouter,
        usersRouter,
        ProdutoRouter,
        CompraRouter
    ]).then(server => {
        console.log('Server is listening on:', server.application.address())
        // process.on('unhandledRejection', up => { throw ` Erro de unhandledRejection ${up}` })
    }).catch(error => {
        console.log('Server Failed To Start')
        console.error(error)
        process.exit(1)
    })
} 