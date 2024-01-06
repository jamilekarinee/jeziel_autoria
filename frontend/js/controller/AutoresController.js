import AutorView from "../view/AutorView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarAutorFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = AutorView.renderizarFormulario();
  document.getElementById("formulario_autor").addEventListener("submit", cadastrarAutor);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarAutor(event) {
  event.preventDefault();
  const nomeValor = document.getElementById("autor_formulario").value;
  const nascimentoValor = document.getElementById("autor_nascimento_formulario").value;
  const nacionalidadeValor = document.getElementById("autor_nacionalidade_formulario").value;
  const novoAutor = { nome: nomeValor, nascimento: nascimentoValor, nacionalidade: nacionalidadeValor };

  try {
    await fetch(`${API_BASE_URL}/autores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoAutor),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaAutor(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar Autor:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaAutor(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/autores");
    const autoresBD = await response.json(); 

    const autores = autoresBD.map((row) => {
      return {
        id: row.id,
        autor: row.autor,
        nascimento: row.nascimento,
        nacionalidade: row.nacionalidade,
      };
    });
    componentePrincipal.innerHTML = AutorView.renderizarTabela(autores);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
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
      const autorId = this.getAttribute("autor-id");
      excluirAutor(autorId);
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
      const autorId = this.getAttribute("autor-atualizar-id");
      buscarAutor(autorId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirAutor(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/autores/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir o autor");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaAutor(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir o autor:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarAutor(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/autores/${id}`);
    const autoresBD = await response.json();
    if (autoresBD.length <= 0) return;

    const autor = autoresBD.map(row => ({
        id: row.id,
        autor: row.autor,
        nascimento: row.nascimento,
        nacionalidade: row.nacionalidade,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = AutorView.renderizarFormularioAtualizar(autor);
    document.getElementById("formulario_autor_atualizar").addEventListener("submit", atualizarAutor);
  } catch (error) {
    console.error("Erro ao buscar autores:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarAutor(event) {
  event.preventDefault();
  const nomeValor = document.getElementById("autor_formulario").value;
  const nacionalidadeValor = document.getElementById("autor_nacionalidade_formulario").value;
  const nascimentoValor = document.getElementById("autor_nascimento_formulario").value;
  const autor = {autor: nomeValor, nacionalidade: nacionalidadeValor, nascimento: nascimentoValor, };

  try {
    const response = await fetch(`${API_BASE_URL}/autores`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(autor),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o autor");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaAutor(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar autor:", error);
  }
}

const autorController = {
  renderizarAutorFormulario,
  cadastrarAutor,
  renderizarListaAutor,
  excluirAutor
};

export default autorController;
