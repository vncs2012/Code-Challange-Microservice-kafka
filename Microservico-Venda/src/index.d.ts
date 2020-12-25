import { User } from './server/users/users.model'

declare module 'restify' {
    export interface Request {
        authenticated: User
    }
}