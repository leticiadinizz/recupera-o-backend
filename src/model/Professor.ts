import { pool } from "./Database";

// Representa um registro de Professor no sistema.
export class Professor {
  constructor(
    private _id_professor: number | null,
    private _nome_completo: string,
    private _data_contratacao: Date,
    private _disciplina_ensino: string,
    private _nivel_formacao: string
  ) {}

  // Getters
  get id_professor(): number | null {
    return this._id_professor;
  }

  get nome_completo(): string {
    return this._nome_completo;
  }

  get data_contratacao(): Date {
    return this._data_contratacao;
  }

  get disciplina_ensino(): string {
    return this._disciplina_ensino;
  }

  get nivel_formacao(): string {
    return this._nivel_formacao;
  }

  // Setters
  set nome_completo(value: string) {
    this._nome_completo = value;
  }

  set data_contratacao(value: Date) {
    this._data_contratacao = value;
  }

  set disciplina_ensino(value: string) {
    this._disciplina_ensino = value;
  }

  set nivel_formacao(value: string) {
    this._nivel_formacao = value;
  }

  // Lista todos os professores
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

  // Insere um novo professor e retorna o id
  static async criar(p: Omit<Professor, 'id_professor'>): Promise<number> {
    const result = await pool.query(
      `INSERT INTO Professor (nome_completo, data_contratacao, disciplina_ensino, nivel_formacao)
       VALUES ($1, $2, $3, $4) RETURNING id_professor`,
      [p.nome_completo, p.data_contratacao, p.disciplina_ensino, p.nivel_formacao]
    );
    return result.rows[0].id_professor;
  }

  // Atualiza um professor existente
  static async atualizar(p: Professor): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Professor SET nome_completo=$1, data_contratacao=$2, disciplina_ensino=$3, nivel_formacao=$4
       WHERE id_professor=$5`,
      [p.nome_completo, p.data_contratacao, p.disciplina_ensino, p.nivel_formacao, p.id_professor]
    );
    return (result.rowCount ?? 0) > 0;
  }

  // Remove um professor pelo ID
  static async deletar(id: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM Professor WHERE id_professor = $1", [id]
    );
    return (result.rowCount ?? 0) > 0;
  }
}
