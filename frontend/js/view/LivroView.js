/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_livro">
              <div class="form-group">
                  <label for="livro_titulo">Título do Livro:</label>
                  <input type="text" class="form-control" id="livro_titulo_formulario">
              </div>
              <div class="form-group">
                  <label for="livro_autor">Autor:</label>
                  <textarea class="form-control" id="livro_autor_formulario"></textarea>
              </div>
              <div class="form-group">
                  <label for="livro_publicado">Ano de Publicação:</label>
                  <textarea class="form-control" id="livro_publicado_formulario"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma tarefa existente.
 * @param {Object} livro - A tarefa a ser atualizada.
 * @return {string} HTML do formulário de atualização de tarefa.
 */
function renderizarFormularioAtualizar(livro) {
    return `
            <form class="mt-3" id="formulario_livro_atualizar">
                <input type="hidden" class="form-control" id="livro_id_formulario" value="${livro.id}">
                <div class="form-group">
                    <label for="livro_titulo">Título do livro:</label>
                    <input type="text" class="form-control" id="livro_titulo_formulario" value="${livro.titulo}">
                </div>
                <div class="form-group">
                    <label for="livro_autor">Autor do Livro:</label>
                    <textarea class="form-control" id="livro_autor_formulario">${livro.autor}</textarea>
                </div>
                <div class="form-group">
                    <label for="livro_publicado">Ano de Publicação:</label>
                    <textarea class="form-control" id="livro_publicado_formulario">${livro.publicado}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} livros - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarTabela(livros) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Título do livro</th>
                      <th>Autor</th>
                      <th>Ano</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  livros.forEach((livro) => {
    tabela += `
              <tr>
                  <td>${livro.titulo}</td>
                  <td>${livro.autor}</td>
                  <td>${livro.publicado}</td>
                  <td>
                    <button class="excluir-btn" livro-id=${livro.id}>Excluir</button>
                    <button class="atualizar-btn" livro-atualizar-id=${livro.id}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  tabela += `
              </tbody>
          </table>
      `;

  return tabela;
}

const livroView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default livroView;
