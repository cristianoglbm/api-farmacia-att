import { Router, Request, Response } from "express";
import prisma from "../database/db";
import { Prisma, Tipo, Tarja, ViaConsumo } from "@prisma/client";

const router = Router();

// =========================
// LISTAR
// =========================
router.get("/", async (req: Request, res: Response) => {
  try {
    const lista = await prisma.medicamentos.findMany();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar medicamentos.", error });
  }
});

// =========================
// CRIAR
// =========================
router.post("/", async (req: Request, res: Response) => {
  try {
    const dados = req.body;

    const novo = await prisma.medicamentos.create({
      data: {
        Nome_Medicamento: dados.nome,
        Dosagem: dados.dosagem,
        Tipo: dados.tipo ? dados.tipo as Tipo : null,
        Tarja: dados.tarja ? dados.tarja as Tarja : "Sem_tarja",
        Via_consumo: dados.via_consumo ? dados.via_consumo as ViaConsumo : null,
        Mg_Ml: dados.mg_ml ? new Prisma.Decimal(dados.mg_ml) : null,
        Validade_Medicamento: null,
        Principio_Ativo: null,
        Alertas: dados.alertas || null
      },
    });

    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar medicamento.", error });
  }
});

// =========================
// ATUALIZAR
// =========================
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dados = req.body;

    const atualizado = await prisma.medicamentos.update({
      where: { ID: Number(id) },
      data: {
        Nome_Medicamento: dados.nome,
        Dosagem: dados.dosagem,
        Tipo: dados.tipo ? dados.tipo as Tipo : null,
        Tarja: dados.tarja ? dados.tarja as Tarja : "Sem_tarja",
        Via_consumo: dados.via_consumo ? dados.via_consumo as ViaConsumo : null,
        Mg_Ml: dados.mg_ml ? new Prisma.Decimal(dados.mg_ml) : null,
        Validade_Medicamento: null,
        Principio_Ativo: null,
        Alertas: dados.alertas || null
      },
    });

    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar medicamento.", error });
  }
});

// =========================
// DELETAR
// =========================
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.medicamentos.delete({
      where: { ID: Number(id) }
    });

    res.json({ message: "Medicamento removido com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir medicamento.", error });
  }
});

export default router;
