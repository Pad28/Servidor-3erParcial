/*
  Warnings:

  - You are about to alter the column `ultimaActualizacion` on the `Dispositivo` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
  - You are about to alter the column `fecha` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Dispositivo` MODIFY `ultimaActualizacion` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Evento` MODIFY `fecha` DATETIME NOT NULL;
