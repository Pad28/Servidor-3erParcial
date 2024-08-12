/*
  Warnings:

  - You are about to alter the column `ultimaActualizacion` on the `Dispositivo` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[nombre]` on the table `Dispositivo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre` to the `Dispositivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Dispositivo` ADD COLUMN `nombre` VARCHAR(100) NOT NULL,
    MODIFY `ultimaActualizacion` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Evento` MODIFY `fecha` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Dispositivo_nombre_key` ON `Dispositivo`(`nombre`);
