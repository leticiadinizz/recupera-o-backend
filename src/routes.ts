import express from 'express';
import { ProfessorController } from './controller/ProfessorController';

const router = express.Router();

router.get('/listar/professores', ProfessorController.listar);
router.post('/cadastro/professores', ProfessorController.cadastrar);
router.put('/atualiza/professores/:id', ProfessorController.atualizar);
router.put('/deleta/professores/:id', ProfessorController.deletar);

export default router;
