/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
    return `
            <form class="mt-3" id="formulario_autor">
                <div class="form-group">
                    <label for="autor_titulo">Nome do usuário:</label>
                    <input type="text" class="form-control" id="autor_formulario">
                </div>
                <div class="form-group">
                    <label for="autor_nascimento">Ano de nascimento:</label>
                    <textarea class="form-control" id="autor_nascimento_formulario"></textarea>
                </div>
                <div class="form-group">
                    <label for="autor_nacionalidade">Nacionalidade:</label>
                    <textarea class="form-control" id="autor_nacionalidade_formulario"></textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
  }
  
  /**
   * Renderiza o formulário para atualizar uma tarefa existente.
   * @param {Object} autor - A tarefa a ser atualizada.
   * @return {string} HTML do formulário de atualização de tarefa.
   */
  function renderizarFormularioAtualizar(autor) {
      return `
              <form class="mt-3" id="formulario_autor_atualizar">
                  <input type="hidden" class="form-control" id="autor_id_formulario" value="${autor.id}">
                  <div class="form-group">
                      <label for="autor_nome">Nome do usuário:</label>
                      <input type="text" class="form-control" id="autor_formulario" value="${autor.autor}">
                  </div>
                  <div class="form-group">
                      <label for="autor_nascimento">Data de nascimento:</label>
                      <textarea class="form-control" id="autor_nascimento_formulario">${autor.nascimento}</textarea>
                  </div>
                  <div class="form-group">
                      <label for="autor_nacionalidade">Gênero:</label>
                      <textarea class="form-control" id="autor_nacionalidade_formulario">${autor.nacionalidade}</textarea>
                  </div>
                  <button type="submit" class="btn btn-primary mt-2">Salvar</button>
              </form>
          `;
  }
  
    /**
   * Renderiza a tabela de tarefas.
   * @param {Array} autores - Lista de tarefas a serem exibidas.
   * @return {string} HTML da tabela de tarefas.
   */
  function renderizarTabela(autores) {
    let tabela = `
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Autor</th>
                        <th>Ano de nascimento</th>
                        <th>Nacionalidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
        `;
  
    autores.forEach((autor) => {
      tabela += `
                <tr>
                    <td>${autor.nome}</td>
                    <td>${autor.nascimento}</td>
                    <td>${autor.nacionalidade}</td>
                    <td>
                      <button class="excluir-btn" autor-id=${autor.id}>Excluir</button>
                      <button class="atualizar-btn" autor-atualizar-id=${autor.id}>Atualizar</button>
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
  
  const autorView = {
      renderizarFormulario,
      renderizarTabela,
      renderizarFormularioAtualizar
  };
  
  export default autorView;
  