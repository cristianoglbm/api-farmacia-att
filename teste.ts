import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Busca apenas um tratamento, sem include
  const tratamento = await prisma.tratamento.findFirst();
  console.log(tratamento);

  // Busca com include para relações (aqui pode dar erro)
  // const tratamentoInclude = await prisma.tratamento.findFirst({
  //   include: { paciente: true } // ⚠️ Só use quando souber o nome exato
  // });
  // console.log(tratamentoInclude);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
