import { Request, Response } from "express";
import prisma from "../database/db";

export default {

  // =========================================================
  // LISTAR PACIENTES
  // =========================================================
  async listar(req: Request, res: Response) {
    try {
      const pacientes = await prisma.paciente.findMany({
        select: {
          ID: true,
          Nome_paciente: true,
          Telefone: true,
          Email: true,
          Data_Nascimento: true,
          Genero: true,
          Profissao: true,
        },
      });

      const pacientesFormatados = pacientes.map((p) => ({
        id: p.ID,
        nome_completo: p.Nome_paciente,
        telefone: p.Telefone || "",
        email: p.Email || "",
        data_nascimento: p.Data_Nascimento,
        genero: p.Genero || "NB",
        profissao: p.Profissao || "",
      }));

      return res.json(pacientesFormatados);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar pacientes.", error });
    }
  },

  // =========================================================
  // CRIAR PACIENTE
  // =========================================================
  async criar(req: Request, res: Response) {
    try {
      const { Nome_paciente, Telefone, Email, Data_Nascimento, Genero, Profissao } = req.body;

      if (!Nome_paciente || !Data_Nascimento) {
        return res.status(400).json({ message: "Nome e Data de Nascimento são obrigatórios." });
      }

      // Validação de data
      const dataFormatada = new Date(Data_Nascimento);
      if (isNaN(dataFormatada.getTime())) {
        return res.status(400).json({ message: "Data de nascimento inválida." });
      }

      // Validação de gênero
      const generosValidos = ["M", "F", "T", "NB"];
      if (Genero && !generosValidos.includes(Genero)) {
        return res.status(400).json({ message: "Gênero inválido." });
      }

      const novo = await prisma.paciente.create({
        data: {
          Nome_paciente,
          Telefone: Telefone || null,
          Email: Email || null,
          Data_Nascimento: dataFormatada,
          Genero: Genero || "NB",
          Profissao: Profissao || null,
        },
      });

      return res.status(201).json({
        id: novo.ID,
        nome_completo: novo.Nome_paciente,
        telefone: novo.Telefone || "",
        email: novo.Email || "",
        data_nascimento: novo.Data_Nascimento,
        genero: novo.Genero || "NB",
        profissao: novo.Profissao || "",
      });

    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar paciente.", error });
    }
  },

  // =========================================================
  // EDITAR PACIENTE
  // =========================================================
  async editar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { Nome_paciente, Telefone, Email, Data_Nascimento, Genero, Profissao } = req.body;

      let dataNascimentoFormatada = undefined;

      if (Data_Nascimento) {
        const d = new Date(Data_Nascimento);
        if (isNaN(d.getTime())) {
          return res.status(400).json({ message: "Data de nascimento inválida." });
        }
        dataNascimentoFormatada = d;
      }

      const atualizado = await prisma.paciente.update({
        where: { ID: Number(id) },
        data: {
          Nome_paciente,
          Telefone: Telefone || null,
          Email: Email || null,
          Data_Nascimento: dataNascimentoFormatada,
          Genero: Genero || null,
          Profissao: Profissao || null,
        },
      });

      return res.json({
        id: atualizado.ID,
        nome_completo: atualizado.Nome_paciente,
        telefone: atualizado.Telefone || "",
        email: atualizado.Email || "",
        data_nascimento: atualizado.Data_Nascimento,
        genero: atualizado.Genero || "NB",
        profissao: atualizado.Profissao || "",
      });

    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar paciente.", error });
    }
  },

  // =========================================================
  // DELETAR PACIENTE
  // =========================================================
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.paciente.delete({
        where: { ID: Number(id) },
      });

      return res.json({ message: "Paciente removido com sucesso." });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao excluir paciente.", error });
    }
  },
};
