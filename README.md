# Portal Zacarias

## Sobre o projeto

O **Portal Zacarias** é uma API desenvolvida utilizando Node.js e Express, com o objetivo de simular um portal de notícias. O sistema permite o gerenciamento de notícias e comentários, além de possuir diferentes níveis de acesso de acordo com o perfil do usuário.

A aplicação utiliza rotas HTTP para realizar operações de criação, consulta, edição e exclusão de notícias, usuários e comentários.

## Tecnologias utilizadas

- Node.js: ambiente de execução JavaScript.
- Express: framework utilizado para criação e gerenciamento das rotas da API.
- JavaScript: linguagem utilizada no desenvolvimento.
- JSON: formato utilizado para receber e retornar dados.

## Perfis de usuários

| Perfil | Permissões |
|---|---|
| Autor | Criar, editar e excluir notícias conforme as regras do sistema. |
| Leitor | Acessar notícias publicadas e postar comentários. |
| Moderador | Consultar a lista de usuários e excluir comentários. |

## Funcionalidades

- Login de usuários por meio de ID e senha.
- Criação de notícias.
- Consulta de notícias pelo ID.
- Edição de notícias.
- Exclusão de notícias.
- Publicação de comentários.
- Exclusão de comentários por moderadores.
- Consulta da lista de usuários com autorização de moderador.
- Controle de acesso baseado no perfil do usuário.
- Validação dos dados recebidos nas requisições.

## Rotas da API

Todas as requisições que enviam dados devem utilizar o formato JSON.

### 1. Página inicial

**GET /**

Retorna uma mensagem de boas-vindas ao Portal Zacarias.

### 2. Login

**POST /login**

Realiza a autenticação do usuário utilizando ID e senha.

Exemplo de corpo da requisição:

```json
{
  "id": "123456789",
  "senha": "wo2342"
}
```

Retorna o nome e o perfil do usuário autenticado.

### 3. Criar notícia

**POST /noticias/criacao**

Permite que usuários com perfil de autor criem notícias.

Exemplo de corpo da requisição:

```json
{
  "nome": "Nova notícia do portal",
  "cidade": "São Paulo",
  "status": "publicado"
}
```

A notícia criada recebe um ID, o nome do autor e uma lista de comentários inicialmente vazia.

### 4. Consultar usuários

**GET /usuario**

Retorna a lista de usuários cadastrados.

Disponível somente para usuários com perfil de moderador.

### 5. Publicar comentário

**POST /comentario/postar/:id**

Adiciona um comentário à notícia correspondente ao ID informado na URL.

Exemplo de corpo da requisição:

```json
{
  "comentario": "Essa notícia é muito interessante!"
}
```

### 6. Consultar notícia

**GET /noticias/:id**

Busca uma notícia pelo seu ID.

A consulta verifica se a notícia está publicada e considera a privacidade do autor.

### 7. Excluir notícia

**DELETE /noticia/deletar/:id**

Permite excluir notícias de acordo com as regras de autorização do sistema.

### 8. Excluir comentário

**DELETE /comentario/deletar**

Permite que usuários com perfil de moderador excluam comentários de uma notícia.

Exemplo de corpo da requisição:

```json
{
  "id": 1,
  "comentario": "Comentário que será excluído"
}
```

### 9. Editar notícia

**POST /noticia/editar/:id**

Permite alterar as informações de uma notícia.

Exemplo de corpo da requisição:

```json
{
  "nome": "Notícia atualizada",
  "cidade": "Campo Grande",
  "status": "publicado"
}
```

## Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Editor de código, como Visual Studio Code.

### Passo a passo

**1. Instale as dependências:**

```bash
npm install express
```

**2. Execute o servidor:**

```bash
node app.js
```

Caso o arquivo principal tenha outro nome, substitua `app.js` pelo nome correto.

**3. Acesse a aplicação:**

Utilize o navegador ou uma ferramenta como Postman ou Insomnia para realizar as requisições.

O servidor estará disponível em:

```text
http://localhost:3000
```

## Estrutura do projeto

```text
PORTAL-ZACARIAS/
│
├── node_modules/
├── app.js
├── package.json
└── README.md
```

## Armazenamento de dados

Os dados dos usuários e das notícias são armazenados em arrays diretamente no código JavaScript.

Isso significa que os dados são mantidos apenas enquanto o servidor está em execução. Ao reiniciar a aplicação, as alterações realizadas são perdidas.

## Considerações finais

O Portal Zacarias é um projeto de desenvolvimento de API REST utilizando Express, com foco na prática de rotas HTTP, manipulação de dados, validação de requisições e controle de permissões por perfil de usuário.
