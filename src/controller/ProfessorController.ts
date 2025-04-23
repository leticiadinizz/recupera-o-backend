import { Request, Response } from 'express';
import { pool } from '../database';
import { Professor } from '../model/ProfessorModel';

export class ProfessorController {
  static async listar(req: Request, res: Response) {
    const result = await pool.query('SELECT * FROM Professor');
    res.status(200).json(result.rows);
  }

  static async cadastrar(req: Request, res: Response) {
    const { nome_completo, data_contratacao, disciplina_ensino, nivel_formacao } = req.body;
    await pool.query(
      'INSERT INTO Professor (nome_completo, data_contratacao, disciplina_ensino, nivel_formacao) VALUES ($1, $2, $3, $4)',
      [nome_completo, data_contratacao, disciplina_ensino, nivel_formacao]
    );
    res.status(201).json({ mensagem: 'Professor cadastrado com sucesso!' });
  }

  static async atualizar(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { nome_completo, data_contratacao, disciplina_ensino, nivel_formacao } = req.body;
    await pool.query(
                       'UPDATE Professor SET nome_completo = $1, data_contratacao = $2, disciplina_ensino = $3, nivel_formacao = $4 WHERE id_professor = $5',
      [nome_completo, data_contratacao, disciplina_ensino, nivel_formacao, id]
    );
    res.status(200).json({ mensagem: 'Professor atualizado com sucesso!' });
  }

  static async deletar(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM Professor WHERE id_professor = $1', [id]);
    res.status(200).json({ mensagem: 'Professor deletado com sucesso!' });
  }
}
