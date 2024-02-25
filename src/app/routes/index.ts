
import express from 'express'

import { AuthRouter } from '../module/users/route'
import { GeneralRouter } from '../module/generalInfo/route'
import { AddressRouter } from '../module/addresses/route'
import { EduRouter } from '../module/eduInfo/route'
import { FamilyRouter } from '../module/familyInfo/route'
import { PersonalInfoRouter } from '../module/personalInfo/route'
import { ProfessionalRouter } from '../module/professionalInfo/route'
import { MaritalRouter } from '../module/maritalInfo/route'
import { PertnarRouter } from '../module/pertnerInfo/route'
import { AgreementRouter } from '../module/agreementInfo/route'
import { ContactRouter } from '../module/contactInfo/route'
import { BioDataRouter } from '../module/biodata/route'
const userRootRoute = express.Router()



const ModuleRoute = [
    {
        path: '/auth',
        routes: AuthRouter
    },
    {
        path: '/general',
        routes: GeneralRouter
    },
    {
        path: '/address',
        routes: AddressRouter
    },
    {
        path: '/edu',
        routes: EduRouter
    },
    {
        path: '/family',
        routes: FamilyRouter
    },
    {
        path: '/personal',
        routes: PersonalInfoRouter
    },
    {
        path: '/professional',
        routes: ProfessionalRouter
    },
    {
        path: '/marital',
        routes: MaritalRouter
    },
    {
        path: '/partner',
        routes: PertnarRouter
    },
    {
        path: '/agreement',
        routes: AgreementRouter
    },
    {
        path: '/contact',
        routes: ContactRouter
    },
    {
        path: '/bioData',
        routes: BioDataRouter
    },
   
]

ModuleRoute.forEach(routes => userRootRoute.use(routes.path, routes.routes))

export default userRootRoute