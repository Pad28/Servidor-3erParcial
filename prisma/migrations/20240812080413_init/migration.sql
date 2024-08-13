/*
  Warnings:

  - You are about to alter the column `ultimaActualizacion` on the `Dispositivo` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Dispositivo` ADD COLUMN `nivel_agua` DOUBLE NULL,
    ADD COLUMN `ph_agua` DOUBLE NULL,
    MODIFY `ultimaActualizacion` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Evento` MODIFY `fecha` DATETIME NOT NULL;
