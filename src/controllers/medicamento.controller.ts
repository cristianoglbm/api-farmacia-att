import { Request, Response } from "express";
import { PrismaClient, Tipo, Tarja, ViaConsumo, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const criarMedicamento = async (req: Request, res: Response) => {
  try {
    const {
      nome,
      dosagem,
      tipo,
      tarja,
      via_consumo,
      mg_ml,
      alertas,
    } = req.body;

    const novoMedicamento = await prisma.medicamentos.create({
      data: {
        Nome_Medicamento: nome,
        Dosagem: dosagem,
        Tipo: tipo ? tipo as Tipo : null,
        Tarja: tarja ? tarja as Tarja : "Sem_tarja",
        Via_consumo: via_consumo ? via_consumo as ViaConsumo : null,
        Mg_Ml: mg_ml ? new Prisma.Decimal(mg_ml) : null,
        Alertas: alertas || null,
      },
    });

    return res.status(201).json(novoMedicamento);
  } catch (err) {
    console.error("Erro ao adicionar medicamento:", err);
    return res.status(500).json({
      error: "Erro ao adicionar medicamento",
    });
  }
};
