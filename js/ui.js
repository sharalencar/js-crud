import api from "./api.js";

const ui = {
  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos");
    const mensagemVazia = document.getElementById("mensagem-vazia");
    listaPensamentos.innerHTML = "";
    try {
      const pensamentos = await api.buscarPensamentos();
      pensamentos.forEach(ui.adicionarPensamentoNaLista);
      if (pensamentos.length === 0) {
        mensagemVazia.style.display = "block";
      } else {
        mensagemVazia.style.display = "none";
        pensamentos.forEach(ui.adicionarPensamentoNaLista);
      }
    } catch {
      alert("Erro ao renderizar pensamentos");
    }
  },

  adicionarPensamentoNaLista(pensamento) {
    const listaPensamentos = document.getElementById("lista-pensamentos");
    const li = document.createElement("li");
    li.setAttribute("data-id", pensamento.id);
    li.classList.add("li-pensamento");

    const iconeAspas = document.createElement("img");
    iconeAspas.src = "assets/imagens/aspas-azuis.png";
    iconeAspas.alt = "Aspas azuis";
    iconeAspas.classList.add("icone-aspas");

    const divConteudo = document.createElement("div");
    divConteudo.classList.add("pensamento-conteudo");
    divConteudo.textContent = pensamento.conteudo;

    const divAutoria = document.createElement("div");
    divAutoria.classList.add("pensamento-autoria");
    divAutoria.textContent = pensamento.autoria;

    const btnEditar = document.createElement("button");
    btnEditar.classList.add("botao-editar");
    btnEditar.onclick = () => ui.preencherForm(pensamento.id);

    const iconeEditar = document.createElement("img");
    iconeEditar.src = "assets/imagens/icone-editar.png";
    iconeEditar.alt = "Editar";
    btnEditar.appendChild(iconeEditar);

    const btnDeletar = document.createElement("button");
    btnDeletar.classList.add("botao-excluir");
    btnDeletar.onclick = async () => {
      try {
        await api.excluirPensamento(pensamento.id);
        ui.renderizarPensamentos();
      } catch (error) {
        alert("Erro ao excluir pensamento.");
      }
    };

    const iconeDeletar = document.createElement("img");
    iconeDeletar.src = "assets/imagens/icone-excluir.png";
    iconeDeletar.alt = "Deletar";
    btnDeletar.appendChild(iconeDeletar);

    const icones = document.createElement("div");
    icones.classList.add("icones");
    icones.appendChild(btnEditar);
    icones.appendChild(btnDeletar);

    li.appendChild(iconeAspas);
    li.appendChild(divConteudo);
    li.appendChild(divAutoria);
    li.appendChild(icones);

    listaPensamentos.appendChild(li);
  },

  limparForm() {
    document.getElementById("pensamento-form").reset();
  },

  async preencherForm(pensamentoId) {
    const pensamento = await api.buscarPensamentoPorId(pensamentoId);
    document.getElementById("pensamento-id").value = pensamento.id;
    document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
    document.getElementById("pensamento-autoria").value = pensamento.autoria;
  },
};

export default ui;
