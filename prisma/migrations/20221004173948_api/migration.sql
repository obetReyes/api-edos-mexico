-- DropForeignKey
ALTER TABLE `apikeys` DROP FOREIGN KEY `APIkeys_usuarioEmail_fkey`;

-- AddForeignKey
ALTER TABLE `APIkeys` ADD CONSTRAINT `APIkeys_usuarioEmail_fkey` FOREIGN KEY (`usuarioEmail`) REFERENCES `usuarios`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
