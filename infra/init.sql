CREATE TABLE Professor (
    id_professor SERIAL PRIMARY KEY,
    nome_completo VARCHAR(90) NOT NULL,
    data_contratacao DATE NOT NULL,
    disciplina_ensino VARCHAR(50),
    nivel_formacao VARCHAR(50) NOT NULL
);
INSERT INTO Professor (nome_completo, data_contratacao, disciplina_ensino, nivel_formacao) VALUES
('Ariana Grande Butera', '2020-03-15', 'Artes', 'Mestrado'),
('Lysandre Sinclair Ainsworth', '2018-08-21', 'História', 'Doutorado'),
('Rayan Zaidi', '2019-01-10', 'Filosofia', 'Mestrado'),
('Rafael Lange', '2021-07-05', 'Geopolítica', 'Especialização'),
('Fernanda Torres', '2017-11-30', 'Sociologia', 'Doutorado');

SELECT * FROM Professor