"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const enums_1 = require("../../config/enums");
exports.prisma = new client_1.PrismaClient();
const connectionDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        exports.prisma.$connect();
        console.log('Base de datos online');
        const arrayDevices = Object.keys(enums_1.Dispositivos);
        const existDevices = yield exports.prisma.dispositivo.findMany();
        if (existDevices.length < arrayDevices.length) {
            arrayDevices.forEach((device) => __awaiter(void 0, void 0, void 0, function* () {
                yield exports.prisma.dispositivo.create({
                    data: {
                        estado: false,
                        nombre: device,
                        ultimaActualizacion: (new Date()).toISOString(),
                    }
                });
            }));
            console.log("Dispositivos creados");
        }
    }
    catch (error) {
        throw error;
    }
});
exports.connectionDB = connectionDB;
