-- AlterTable
ALTER TABLE `tratamento` ADD COLUMN `pacienteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `tratamento` ADD CONSTRAINT `tratamento_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `paciente`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;
