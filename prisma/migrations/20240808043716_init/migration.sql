/*
  Warnings:

  - You are about to drop the `Eventos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Eventos` DROP FOREIGN KEY `Eventos_id_dispositivo_fkey`;

-- DropTable
DROP TABLE `Eventos`;

-- CreateTable
CREATE TABLE `Evento` (
    `id` VARCHAR(191) NOT NULL,
    `accion` ENUM('ENCENDIDO', 'APAGADO', 'ABIERTO', 'CERRADO') NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `id_dispositivo` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_id_dispositivo_fkey` FOREIGN KEY (`id_dispositivo`) REFERENCES `Dispositivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
