-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(240) NOT NULL,
    `hash` TEXT NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colonias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL DEFAULT '',
    `ciudad` VARCHAR(50) NULL,
    `municipio` INTEGER NULL,
    `asentamiento` VARCHAR(25) NULL,
    `codigo_postal` INTEGER NULL,

    INDEX `index_asentamiento`(`asentamiento`),
    INDEX `index_ciudad`(`ciudad`),
    INDEX `index_codigo_postal`(`codigo_postal`),
    INDEX `index_municipio`(`municipio`),
    INDEX `index_nombre`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL DEFAULT '',
    `pais` INTEGER NOT NULL DEFAULT 0,

    INDEX `index_pais`(`pais`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `municipios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL DEFAULT '',
    `estado` INTEGER NOT NULL DEFAULT 0,

    INDEX `index_estado`(`estado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `colonias` ADD CONSTRAINT `fk_municipio` FOREIGN KEY (`municipio`) REFERENCES `municipios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estados` ADD CONSTRAINT `fk_pais` FOREIGN KEY (`pais`) REFERENCES `paises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `municipios` ADD CONSTRAINT `fk_estado` FOREIGN KEY (`estado`) REFERENCES `estados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
