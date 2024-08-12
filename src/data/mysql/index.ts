import { PrismaClient } from "@prisma/client";
import { Dispositivos } from "../../config/enums";

export const prisma = new PrismaClient();
export const connectionDB = async () => {
    try {
        prisma.$connect();
        console.log('Base de datos online');

        const arrayDevices = Object.keys(Dispositivos);
        const existDevices = await prisma.dispositivo.findMany();

        if (existDevices.length < arrayDevices.length) {
            arrayDevices.forEach(async (device) => {

                await prisma.dispositivo.create({
                    data: {
                        estado: false,
                        nombre: device,
                        ultimaActualizacion: (new Date()).toISOString(),
                    }
                });
            });
            console.log("Dispositivos creados");

        }

    } catch (error) {
        throw error;
    }
}



