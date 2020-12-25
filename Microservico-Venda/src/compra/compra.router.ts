import * as restify from "restify";
import { ModelRouter } from "../common/model-router";
import { Compra } from "./compra.model";
import * as mongoose from "mongoose"
import { authorize } from '../security/authz.handler'

class ComprasRouter extends ModelRouter<Compra> {

    constructor() {
        super(Compra)
    }

    envelope(document) {
        let resource = super.envelope(document)
        const restId = document.itens.produto ? document.itens.produto : document.itens.produto
        resource._links.produto = `/produtos/${restId}`
        return resource
    }


    protected prepareOne(query: mongoose.DocumentQuery<Compra, Compra>): mongoose.DocumentQuery<Compra, Compra> {
        return query.populate('user', 'name')
            .populate('produto', ['codigo', 'nome', 'preco'])
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, this.save)
    }
}

export const CompraRouter = new ComprasRouter();
