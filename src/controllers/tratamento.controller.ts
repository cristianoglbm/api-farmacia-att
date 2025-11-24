import { Request, Response } from "express";
import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

// CRIAR TRATAMENTO
export const criarTratamento = async (req: Request, res: Response) => {
  try {
    const { pacienteId, Diagnostico, Data_inicio, Data_termino, Status: status, Observacoes } = req.body;

    if (!pacienteId || !Diagnostico || !Data_inicio) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes: pacienteId, Diagnostico, Data_inicio" });
    }

    const novoTratamento = await prisma.tratamento.create({
      data: {
        pacienteId,
        Diagnostico,
        Data_inicio: new Date(Data_inicio),
        Data_termino: Data_termino ? new Date(Data_termino) : undefined,
        Status: status ? status as Status : Status.Nao_iniciado,
        Observacoes,
      },
      select: {
        ID: true,
        Diagnostico: true,
        Data_inicio: true,
        Data_termino: true,
        Status: true,
        Observacoes: true,
        paciente: {
          select: {
            ID: true,
            Nome_paciente: true,
            Email: true,
          }
        }
      }
    });

    return res.status(201).json(novoTratamento);
  } catch (error: any) {
    console.error("Erro ao criar tratamento:", error);
    return res.status(500).json({ error: error.message });
  }
};

// LISTAR TODOS OS TRATAMENTOS
export const listarTratamentos = async (_req: Request, res: Response) => {
  try {
    const tratamentos = await prisma.tratamento.findMany({
      select: {
        ID: true,
        Diagnostico: true,
        Data_inicio: true,
        Data_termino: true,
        Status: true,
        paciente: {
          select: {
            ID: true,
            Nome_paciente: true,
          }
        }
      }
    });
    res.json(tratamentos);
  } catch (error: any) {
    console.error("Erro ao listar tratamentos:", error);
    res.status(500).json({ error: error.message });
  }
};

// BUSCAR TRATAMENTO POR ID
export const buscarTratamentoPorId = async (req: Request, res: Response) => {
  try {
    const ID = Number(req.params.id);
    const tratamento = await prisma.tratamento.findUnique({
      where: { ID },
      select: {
        ID: true,
        Diagnostico: true,
        Data_inicio: true,
        Data_termino: true,
        Status: true,
        Observacoes: true,
        paciente: {
          select: {
            ID: true,
            Nome_paciente: true,
          }
        }
      }
    });

    if (!tratamento) return res.status(404).json({ error: "Tratamento não encontrado" });

    res.json(tratamento);
  } catch (error: any) {
    console.error("Erro ao buscar tratamento:", error);
    res.status(500).json({ error: error.message });
  }
};

// ATUALIZAR TRATAMENTO
export const atualizarTratamento = async (req: Request, res: Response) => {
  try {
    const ID = Number(req.params.id);
    const { Diagnostico, Data_inicio, Data_termino, Status: status, Observacoes } = req.body;

    const tratamentoAtualizado = await prisma.tratamento.update({
      where: { ID },
      data: {
        Diagnostico,
        Data_inicio: Data_inicio ? new Date(Data_inicio) : undefined,
        Data_termino: Data_termino ? new Date(Data_termino) : undefined,
        Status: status ? status as Status : undefined,
        Observacoes,
      },
      select: {
        ID: true,
        Diagnostico: true,
        Data_inicio: true,
        Data_termino: true,
        Status: true,
        Observacoes: true,
        paciente: {
          select: {
            ID: true,
            Nome_paciente: true,
          }
        }
      }
    });

    res.json(tratamentoAtualizado);
  } catch (error: any) {
    console.error("Erro ao atualizar tratamento:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETAR TRATAMENTO
export const deletarTratamento = async (req: Request, res: Response) => {
  try {
    const ID = Number(req.params.id);
    if (!ID) return res.status(400).json({ error: "ID do tratamento é obrigatório" });

    await prisma.tratamento.delete({ where: { ID } });
    res.json({ message: "Tratamento excluído com sucesso" });
  } catch (error: any) {
    console.error("Erro ao excluir tratamento:", error);
    res.status(500).json({ error: error.message });
  }
};
