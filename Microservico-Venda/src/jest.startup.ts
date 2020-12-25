import * as jestCli from 'jest-cli'

import { Server } from './server/server'
import { environment } from './common/environment'
import { usersRouter } from './users/users.router'
import { CompraRouter } from './compra/compra.router'
import { ProdutoRouter } from './produto/produto.router'
import { User } from './users/users.model'
import { Compra } from './compra/compra.model'
import { Produto } from './produto/produto.model'

let server: Server
const beforeAllTests = () => {
  environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
  environment.server.port = process.env.SERVER_PORT || 3001
  server = new Server()
  return server.bootstrap([
    usersRouter,
    CompraRouter,
    ProdutoRouter
  ])
    .then(() => User.remove({}).exec())
    .then(() => {
      let admin = new User()
      admin.name = 'admin'
      admin.email = 'admin@email.com'
      admin.password = '1234567'
      admin.profiles = ['admin', 'user']
      return admin.save()
    })
    .then(() => Compra.remove({}).exec())
    .then(() => Produto.remove({}).exec())
}

const afterAllTests = () => {
  return server.shutdown()
}

beforeAllTests()
  .then(() => jestCli.run())
  .then(() => afterAllTests())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
