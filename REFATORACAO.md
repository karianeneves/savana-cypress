# Refatoração da suíte da A1 (Desafio 6)

Suíte: Cypress, 5 casos de teste (CT01–CT05) do Savana Pet Café. Cobertura mantida; nenhum teste removido. Foram adicionados CT06 e CT07 (stubs).

## Tabela de smells (problema → solução)

| # | Problema | Onde | Por que é um problema | Solução |
|---|----------|------|-----------------------|---------|
| 1 | Seletores `data-cy` espalhados nos specs via `cy.dc("...")` | todos os `ct0X` | Mudou um `data-cy`, é preciso editar vários testes; testes misturam "o que" com "como" | Um Page Object por tela em `cypress/support/pages/` (Login, Gerenciamento, CadastroFuncionario, CadastroAnimal, Adocao, CadastroProduto, Cardapio). Seletores só neles |
| 2 | Fluxo de login digitado à mão em CT01, CT02 e dentro do `cy.login` | ct01, ct02, commands.js | Três cópias do mesmo fluxo | `LoginPage.logar()` reaproveitado por specs e pelo comando `cy.login` |
| 3 | `cy.stub()` + `cy.on("window:alert")` copiado em 4 testes | ct02–ct05 | Duplicação de infraestrutura | Comando `cy.espiarAlerta()` (alias `@alerta`) |
| 4 | Criação do usuário de teste e dados fixos no `dados.js` / dentro dos testes | ct02–ct05, dados.js | Dados misturados com a lógica; difícil trocar ou reaproveitar | `cypress/fixtures/*.json` (usuarios, animal, produto, funcionarioInvalido, mensagens); `apiUrl` em `cypress/support/api.js` |
| 5 | Mensagens esperadas e textos digitados no teste (`"Animal cadastrado com sucesso!"`, `"Cachorro"`...) | ct04, ct05 | Texto duplicado e difícil de manter | `fixtures/mensagens.json` e `fixtures/animal.json` / `produto.json` |
| 6 | Dependência total do backend real (SQLite, estado de execuções anteriores) | todos | Teste lento, quebra se a API falhar, não consegue simular erro | CT06 (sucesso) e CT07 (falha 401) usando `cy.intercept` com stub |
| 7 | Sincronização implícita após o submit (só o retry das asserções) em chamadas à API | ct04, ct05 | Instável se a API demorar | `cy.intercept(...).as()` + `cy.wait("@alias")` na requisição real, depois asserções |
| 8 | Nome único gerado com `Date.now()` repetido em cada teste | ct04, ct05 | Duplicação | Comando `cy.nomeUnico(base)` |
| 9 | Fixture `example.json` e `dados.js` sem uso/legados | cypress/fixtures, support | Código morto | Removidos |

Esperas fixas: a suíte da A1 **não tinha `cy.wait(<ms>)`** (conferido com `grep -rn "cy.wait([0-9]" cypress/`). O ganho de estabilidade veio dos itens 6 e 7: esperar pela requisição (`cy.wait("@alias")`) em vez de depender de tempo.

## Passos extraídos para comandos (`cypress/support/commands.js`)
1. `cy.garantirUsuario()`
2. `cy.login()` (com `cy.session`, usa `LoginPage`)
3. `cy.espiarAlerta()` (e `cy.nomeUnico()` como apoio)

## Fixtures usadas em 2 cenários, um de falha
- Sucesso (CT06): `GET /pets` stubado com `fixtures/pets-lista.json`; a página de adoção mostra 2 pets.
- Falha (CT07): `POST /auth/login` stubado com status 401; o app mostra o alerta "Email ou senha inválidos", continua em `/login` e não grava token.

## Evidência de estabilidade
Rodar 3 vezes seguidas, com backend (3000) e frontend (3001) no ar:
```
for i in 1 2 3; do npx cypress run || break; done
```
Anexar o print em `evidencias/` (ex.: `evidencias/refatoracao-3-execucoes.png`).
