import CadastroProdutoPage from "../support/pages/CadastroProdutoPage";
import CardapioPage from "../support/pages/CardapioPage";

describe("Cardápio", () => {
  beforeEach(() => {
    cy.garantirUsuario();
    cy.login();
  });

  it("CT05 - cadastrar um produto e vê-lo no cardápio", () => {
    cy.fixture("produto").then((produto) => {
      cy.fixture("mensagens").then((msg) => {
        cy.nomeUnico(produto.nome).then((nome) => {
          cy.espiarAlerta();
          cy.intercept("POST", `${Cypress.env("apiUrl")}/menu`).as("criarItem");

          CadastroProdutoPage.visitar();
          CadastroProdutoPage.preencher({ ...produto, nome });
          CadastroProdutoPage.enviar();

          cy.wait("@criarItem").its("response.statusCode").should("be.oneOf", [200, 201]);
          cy.get("@alerta").should("have.been.calledWith", msg.produtoCadastrado);
          cy.url().should("include", "/cardapio");
          CardapioPage.elements.itemComNome(nome).should("be.visible");
        });
      });
    });
  });
});
