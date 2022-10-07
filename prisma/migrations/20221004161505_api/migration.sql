-- CreateTable
CREATE TABLE `APIkeys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `host` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `usage` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `usuarioEmail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `APIkeys` ADD CONSTRAINT `APIkeys_usuarioEmail_fkey` FOREIGN KEY (`usuarioEmail`) REFERENCES `usuarios`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
