/*
  Warnings:

  - You are about to alter the column `ultimaActualizacion` on the `Dispositivo` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `nivelVoltaje` to the `Dispositivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Dispositivo` ADD COLUMN `nivelVoltaje` DOUBLE NOT NULL,
    MODIFY `ultimaActualizacion` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Evento` ADD COLUMN `id_usuario` VARCHAR(100) NULL,
    MODIFY `fecha` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Usuario_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
