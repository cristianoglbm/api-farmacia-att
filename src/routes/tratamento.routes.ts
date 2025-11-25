import { Router } from "express";
import {
  listarTratamentos,
  criarTratamento,
  deletarTratamento,
  atualizarTratamento,
  buscarTratamentoPorId
} from "../controllers/tratamento.controller";

const router = Router();

router.get("/", listarTratamentos);             // LISTAR TODOS
router.get("/:id", buscarTratamentoPorId);      // BUSCAR 1 POR ID
router.post("/", criarTratamento);              // CRIAR
router.put("/:id", atualizarTratamento);        // EDITAR
router.delete("/:id", deletarTratamento);       // DELETAR

export default router;
