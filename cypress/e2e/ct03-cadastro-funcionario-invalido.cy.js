import CadastroFuncionarioPage from "../support/pages/CadastroFuncionarioPage";

describe("Cadastro de funcionário", () => {
  it("CT03 - dados inválidos mostram erros e não cadastram", () => {
    cy.fixture("funcionarioInvalido").then((funcionario) => {
      cy.espiarAlerta();

      CadastroFuncionarioPage.visitar();
      CadastroFuncionarioPage.preencher(funcionario);
      CadastroFuncionarioPage.enviar();

      CadastroFuncionarioPage.elements.erroCpf().should("be.visible");
      CadastroFuncionarioPage.elements.erroSenha().should("be.visible");
      cy.url().should("include", "/cadastro/funcionario");
      cy.get("@alerta").should("not.have.been.called");
    });
  });
});
