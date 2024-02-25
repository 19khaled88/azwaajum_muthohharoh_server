"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = require("../module/users/route");
const route_2 = require("../module/generalInfo/route");
const route_3 = require("../module/addresses/route");
const route_4 = require("../module/eduInfo/route");
const route_5 = require("../module/familyInfo/route");
const route_6 = require("../module/personalInfo/route");
const route_7 = require("../module/professionalInfo/route");
const route_8 = require("../module/maritalInfo/route");
const route_9 = require("../module/pertnerInfo/route");
const route_10 = require("../module/agreementInfo/route");
const route_11 = require("../module/contactInfo/route");
const route_12 = require("../module/biodata/route");
const userRootRoute = express_1.default.Router();
const ModuleRoute = [
    {
        path: '/auth',
        routes: route_1.AuthRouter
    },
    {
        path: '/general',
        routes: route_2.GeneralRouter
    },
    {
        path: '/address',
        routes: route_3.AddressRouter
    },
    {
        path: '/edu',
        routes: route_4.EduRouter
    },
    {
        path: '/family',
        routes: route_5.FamilyRouter
    },
    {
        path: '/personal',
        routes: route_6.PersonalInfoRouter
    },
    {
        path: '/professional',
        routes: route_7.ProfessionalRouter
    },
    {
        path: '/marital',
        routes: route_8.MaritalRouter
    },
    {
        path: '/partner',
        routes: route_9.PertnarRouter
    },
    {
        path: '/agreement',
        routes: route_10.AgreementRouter
    },
    {
        path: '/contact',
        routes: route_11.ContactRouter
    },
    {
        path: '/bioData',
        routes: route_12.BioDataRouter
    },
];
ModuleRoute.forEach(routes => userRootRoute.use(routes.path, routes.routes));
exports.default = userRootRoute;
