-- CreateTable
CREATE TABLE `Dispositivo` (
    `id` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `ultimaActualizacion` DATETIME(3) NOT NULL,
    `ultimoAudio` VARCHAR(100) NOT NULL,
    `ultimaImagen` VARCHAR(100) NOT NULL,
    `ultimaTemperatura` DOUBLE NOT NULL,
    `temperaturaDeseada` DOUBLE NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Eventos` (
    `id` VARCHAR(191) NOT NULL,
    `accion` ENUM('ENCENDIDO', 'APAGADO', 'ABIERTO', 'CERRADO') NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `id_dispositivo` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Eventos` ADD CONSTRAINT `Eventos_id_dispositivo_fkey` FOREIGN KEY (`id_dispositivo`) REFERENCES `Dispositivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
