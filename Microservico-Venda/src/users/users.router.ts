import * as restify from "restify";
import { ModelRouter } from "../common/model-router"
import { User } from "./users.model";
import { authenticate } from '../security/auth.handler'
import { authorize } from '../security/authz.handler'

class UsersRouter extends ModelRouter<User> {

    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }
    findByEmail = (req, resp, next) => {
        if (req.query.email) {
            User.findByEmail(req.query.email)
            .then(user => {
                if (user) return [user]
                return []
            })
            .then(this.renderAll(resp, next))
            .catch(next)
        } else {
            next()
        }
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, [this.findByEmail, this.findAll])
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.replace])
        application.patch(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.update])
        application.del(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.delete])
        application.post(`${this.basePath}/authenticate`, authenticate)
    }
}

export const usersRouter = new UsersRouter();
