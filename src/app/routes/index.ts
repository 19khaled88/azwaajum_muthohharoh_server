
import express from 'express'

import { AuthRouter } from '../module/users/route'
const userRootRoute = express.Router()



const ModuleRoute = [
    {
        path: '/auth',
        routes: AuthRouter
    },
   
]

ModuleRoute.forEach(routes => userRootRoute.use(routes.path, routes.routes))

export default userRootRoute