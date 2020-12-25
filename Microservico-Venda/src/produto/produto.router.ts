import * as restify from "restify"
import { NotFoundError } from "restify-errors"
import { ModelRouter } from "../common/model-router"
import { Produto } from "./produto.model"
import { authorize } from '../security/authz.handler'

class ProdutosRouter extends ModelRouter<Produto> {

    constructor() {
        super(Produto)
    }

    envelope(document) {
        let resource = super.envelope(document)
        resource._links.atributos = `${this.basePath}/${resource._id}/atributos`
        return resource
    }

    findAtributos = (req, resp, next) => {
        Produto.findById(req.params.id, "+atributos").then(rest => {
            if (!rest) {
                throw new NotFoundError('Produto Not Found')
            } else {
                resp.json(rest.atributos)
            }
        }).catch(next)
    }
    replaceAtributos = (req, resp, next) => {
        Produto.findById(req.params.id, "+atributos").then(rest => {
            if (!rest) {
                throw new NotFoundError('Produto Not Found')
            } else {
                rest.atributos = req.body
                return rest.save()
            }
        }).then(rest => {
            resp.json(rest.atributos)
            return next()
        }).catch(next)
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete])

        application.get(`${this.basePath}/:id/atributos`, [this.validateId, this.findAtributos])
        application.put(`${this.basePath}/:id/atributos`, [this.validateId, this.replaceAtributos])
    }
}

export const ProdutoRouter = new ProdutosRouter();
