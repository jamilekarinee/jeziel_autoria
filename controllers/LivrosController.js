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
  executarComandoSQL('SELECT * FROM livros', [], res, "Erro na consulta de livros");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarComandoSQL('SELECT * FROM livros WHERE id = ?', [id], res, "Erro na consulta de livros");
});

router.post('/', (req, res) => {
  const { nome, autor, publicado } = req.body;
  executarComandoSQL('INSERT INTO livros (titulo, autor, publicado) VALUES (?, ?, ?)', [nome, autor, publicado], res, "Erro no cadastro de livros!");
});

router.delete("/:id", (req, res) => {
  const livrosId = req.params.id;
  executarComandoSQL('DELETE FROM livros WHERE id = ?', [livrosId], res, 'Erro ao deletar livros');
});

router.put('/', (req, res) => {
  const { id, nome, autor, publicado } = req.body;
  executarComandoSQL('UPDATE livros SET titulo = ?, autor = ?, publicado = ? WHERE id = ?', [nome, autor, publicado, id], res, "Erro ao atualizar livros");
});

module.exports = router;