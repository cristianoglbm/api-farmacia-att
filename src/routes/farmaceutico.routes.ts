import { Router } from "express";
import { listar, criar, atualizar, deletar, buscarPorId } from "../controllers/farmaceutico.controller";

const router = Router();

// LISTAR TODOS
router.get("/", listar);

// BUSCAR POR ID
router.get("//:id", buscarPorId);

// CRIAR
router.post("/", criar);

// ATUALIZAR
router.put("/:id", atualizar);

// DELETAR
router.delete("/:id", deletar);

export default router;
