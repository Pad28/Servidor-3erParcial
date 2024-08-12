/*
  Warnings:

  - You are about to alter the column `ultimaActualizacion` on the `Dispositivo` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `descripcion` on the `Dispositivo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `fecha` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `direcccion` to the `Dispositivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Dispositivo` ADD COLUMN `direcccion` VARCHAR(100) NOT NULL,
    MODIFY `ultimaActualizacion` DATETIME NOT NULL,
    MODIFY `descripcion` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Evento` MODIFY `fecha` DATETIME NOT NULL;
