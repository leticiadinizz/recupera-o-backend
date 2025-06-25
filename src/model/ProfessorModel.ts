import { pool } from "./Database";

//Representa um registro de Professor no sistema.

export class Professor {
  constructor(
    public id_professor: number | null,
    public nome_completo: string,
    public data_contratacao: Date,
    public disciplina_ensino: string,
    public nivel_formacao: string
  ) {}

  //Lista todos os professores
  static async listar(): Promise<Professor[]> {
    const result = await pool.query("SELECT * FROM Professor ORDER BY id_professor");
    return result.rows.map(r => new Professor(
      r.id_professor,
      r.nome_completo,
      r.data_contratacao,
      r.disciplina_ensino,
      r.nivel_formacao
    ));
  }

  //Busca um professor pelo ID.
  static async buscarPorId(id: number): Promise<Professor | null> {
    const result = await pool.query(
      "SELECT * FROM Professor WHERE id_professor = $1", [id]
    );
    if (result.rowCount === 0) return null;
    const r = result.rows[0];
    return new Professor(r.id_professor, r.nome_completo, r.data_contratacao, r.disciplina_ensino, r.nivel_formacao);
  }

  //Insere um novo professor e retorna o id
  static async criar(p: Omit<Professor, 'id_professor'>): Promise<number> {
    const result = await pool.query(
      `INSERT INTO Professor (nome_completo, data_contratacao, disciplina_ensino, nivel_formacao)
       VALUES ($1,$2,$3,$4) RETURNING id_professor`,
      [p.nome_completo, p.data_contratacao, p.disciplina_ensino, p.nivel_formacao]
    );
    return result.rows[0].id_professor;
  }

  //Atualiza um professor existente.
  static async atualizar(p: Professor): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Professor SET nome_completo=$1, data_contratacao=$2, disciplina_ensino=$3, nivel_formacao=$4
       WHERE id_professor=$5`,
      [p.nome_completo, p.data_contratacao, p.disciplina_ensino, p.nivel_formacao, p.id_professor]
    );
    return (result.rowCount ?? 0) > 0;

  }

  // Remove um professor pelo ID.
  static async deletar(id: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM Professor WHERE id_professor = $1", [id]
    );
    return (result.rowCount ?? 0) > 0;
  }
}