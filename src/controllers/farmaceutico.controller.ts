import { Request, Response } from "express";
import prisma from "../database/db";
import bcrypt from "bcrypt";

// ============================
// LISTAR
// ============================
export async function listar(req: Request, res: Response) {
  try {
    const farmaceuticos = await prisma.farmaceutico.findMany();
    return res.json(farmaceuticos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar farmacêuticos" });
  }
}

// ============================
// CRIAR
// ============================
export async function criar(req: Request, res: Response) {
  try {
    const {
      Nome_Farmaceutico,
      Sobrenome_Farmaceutico,
      Email,
      CPF,
      RN,
      Telefone,
      Genero,
      senha,
      Perfil_ID,
    } = req.body;

    if (!Email || !senha) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novo = await prisma.farmaceutico.create({
      data: {
        Nome_Farmaceutico,
        Sobrenome_Farmaceutico,
        Email,
        CPF,
        RN,
        Telefone,
        Genero,
        Perfil_ID,
        Senha_Hash: senhaHash,
      },
    });

    return res.status(201).json({ message: "Farmacêutico criado com sucesso", novo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar farmacêutico" });
  }
}

// ============================
// ATUALIZAR
// ============================
export async function atualizar(req: Request, res: Response) {
  try {
    const ID = Number(req.params.id);
    const {
      Nome_Farmaceutico,
      Sobrenome_Farmaceutico,
      Email,
      CPF,
      RN,
      Telefone,
      Genero,
      senha,
      Perfil_ID,
    } = req.body;

    let senhaHash: string | undefined = undefined;
    if (senha) {
      senhaHash = await bcrypt.hash(senha, 10);
    }

    const atualizado = await prisma.farmaceutico.update({
      where: { ID },
      data: {
        Nome_Farmaceutico,
        Sobrenome_Farmaceutico,
        Email,
        CPF,
        RN,
        Telefone,
        Genero,
        Perfil_ID,
        ...(senhaHash && { Senha_Hash: senhaHash }),
      },
    });

    return res.json({ message: "Farmacêutico atualizado com sucesso", atualizado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar farmacêutico" });
  }
}

// ============================
// DELETAR
// ============================
export async function deletar(req: Request, res: Response) {
  try {
    const ID = Number(req.params.id);
    await prisma.farmaceutico.delete({ where: { ID } });
    return res.json({ message: "Farmacêutico deletado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar farmacêutico" });
  }
}

// ============================
// BUSCAR POR ID
// ============================
export async function buscarPorId(req: Request, res: Response) {
  try {
    const ID = Number(req.params.id);
    const farmaceutico = await prisma.farmaceutico.findUnique({ where: { ID } });

    if (!farmaceutico) {
      return res.status(404).json({ message: "Farmacêutico não encontrado" });
    }

    return res.json(farmaceutico);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar farmacêutico" });
  }
}