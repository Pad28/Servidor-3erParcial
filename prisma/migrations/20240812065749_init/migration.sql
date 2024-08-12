/*
  Warnings:

  - You are about to alter the column `ultimaActualizacion` on the `Dispositivo` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Dispositivo` MODIFY `ultimaActualizacion` DATETIME NOT NULL,
    MODIFY `ultimoAudio` VARCHAR(100) NULL,
    MODIFY `ultimaImagen` VARCHAR(100) NULL,
    MODIFY `ultimaTemperatura` DOUBLE NULL,
    MODIFY `temperaturaDeseada` DOUBLE NULL,
    MODIFY `descripcion` VARCHAR(100) NULL,
    MODIFY `nivelVoltaje` DOUBLE NULL,
    MODIFY `direcccion` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `Evento` MODIFY `fecha` DATETIME NOT NULL;
