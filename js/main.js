import api from "./api.js";
import ui from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos();

  const formPensamento = document.getElementById("pensamento-form");
  const btnCancelar = document.getElementById("botao-cancelar");
  formPensamento.addEventListener("submit", manipularSubmissaoForm);
  btnCancelar.addEventListener("click", manupularCancelamento);
});

async function manipularSubmissaoForm(e) {
  e.preventDefault();
  const id = document.getElementById("pensamento-id").value;
  const conteudo = document.getElementById("pensamento-conteudo").value;
  const autoria = document.getElementById("pensamento-autoria").value;

  try {
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria });
    } else {
      await api.salvarPensamento({ conteudo, autoria });
    }
    ui.renderizarPensamentos();
  } catch (error) {
    alert("Erro ao salvar pensamento.");
  }
}

function manupularCancelamento() {
  ui.limparForm();
}
