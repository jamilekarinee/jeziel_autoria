const express = require('express');
const router = express.Router();
const db = require('../util/db');
const verificarToken = require('../util/VerificaToken');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function executarComandoSQL(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}

router.get('/', (req, res) => {
  executarComandoSQL('SELECT * FROM autores', [], res, "Erro na consulta de autores");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarComandoSQL('SELECT * FROM autores WHERE id = ?', [id], res, "Erro na consulta de autores");
});

router.post('/', (req, res) => {
  const { autor, nascimento, nacionalidade } = req.body;
  executarComandoSQL('INSERT INTO autores (autor, nascimento, nacionalidade) VALUES ( ?, ?, ?)', [autor, nascimento, nacionalidade], res, "Erro no cadastro de autor!");
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  executarComandoSQL('DELETE FROM usuario WHERE id = ?', [id], res, 'Erro ao deletar autor');
});

router.put('/', (req, res) => {
  const { id, autor, nascimento, nacionalidade } = req.body;
  executarComandoSQL('UPDATE autores SET autor = ?, nascimento = ?, nacionalidade = ? WHERE id = ?', [autor, nascimento, nacionalidade, id], res, "Erro ao atualizar autor");
});

module.exports = router;