import connect from './server/connect'
import { environment } from './common/environment'

connect(environment.db.url)