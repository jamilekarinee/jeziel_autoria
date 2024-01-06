import LivroView from "../view/LivroView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarLivroFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = LivroView.renderizarFormulario();
  document.getElementById("formulario_livro").addEventListener("submit", cadastrarLivro);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarLivro(event) {
  event.preventDefault();
  const tituloValor = document.getElementById("livro_titulo_formulario").value;
  const autorValor = document.getElementById("livro_autor_formulario").value;
  const publicadoValor = document.getElementById("livro_publicado_formulario").value;
  const novoLivro = { titulo: tituloValor, autor: autorValor, publicado: publicadoValor };

  try {
    await fetch(`${API_BASE_URL}/livros`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoLivro),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaLivro(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar livro:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaLivro(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/livros");
    const livrosBD = await response.json(); 

    const livros = livrosBD.map((row) => {
      return {
        id: row.id,
        titulo: row.titulo,
        autor: row.autor,
        publicado: row.publicado,
      };
    });
    componentePrincipal.innerHTML = LivroView.renderizarTabela(livros);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de tarefa.
 * Cada botão, quando clicado, aciona a função de exclusão de tarefa correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const livroId = this.getAttribute("livro-id");
      excluirLivro(livroId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de tarefa.
 * Cada botão, quando clicado, aciona a função de buscar a tarefa específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const livroId = this.getAttribute("livro-atualizar-id");
      buscarLivro(livroId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirLivro(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/livros/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir o livro");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaLivro(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir o livro:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarLivro(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/livros/${id}`);
    const livrosBD = await response.json();
    if (livrosBD.length <= 0) return;

    const livro = livrosBD.map(row => ({
        id: row.id,
        titulo: row.titulo,
        autor: row.autor,
        publicado: row.publicado,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = LivroView.renderizarFormularioAtualizar(livro);
    document.getElementById("formulario_livro_atualizar").addEventListener("submit", atualizarLivro);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarLivro(event) {
  event.preventDefault();
  const tituloValor = document.getElementById("livro_titulo_formulario").value;
  const publicadoValor = document.getElementById("livro_publicado_formulario").value;
  const autorValor = document.getElementById("livro_autor_formulario").value;
  const livro = {titulo: tituloValor, publicado: publicadoValor, autor: autorValor, };

  try {
    const response = await fetch(`${API_BASE_URL}/livros`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(livro),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o livro");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaLivro(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
  }
}

const livroController = {
  renderizarLivroFormulario,
  cadastrarLivro,
  renderizarListaLivro,
  excluirLivro
};

export default livroController;
