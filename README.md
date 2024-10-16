# Psiu API

## Requisitos

### Aluno
- [X] Cadastrar um aluno
 - [X] Não deve ser possível cadastrar RA já cadastrado
 - [X] Gerar senha aleatória para primeiro acesso
  - [X] Criar hash para a senha aleatória gerada

- [X] Editar aluno
  - [X] Deve ser possível alterar o nome e data de nascimento do aluno
  - [X] Não deve ser possível atualizar um student inativo

- [X] Atualizar senha
  - [X] Não deve ser possível colocar uma senha fraca
  - [X] Checar a senha atual do estudante
  - [X] confirmar nova senha duas vezes 

- [X] Deletar aluno
  - [X] Deve utilizar soft delete
 
- [X] Buscar alunos
  - [] Criar páginação na busca de alunos

### Autenticação

- [X] Autenticação com senha
  - [X] não deve ser possível autenticar um estudante inativo
  - [X] Verificar se o RA existe
  - [X] Criar um token de autenticação
- [X] Criar middleware de autenticação
  - [X] Não deve ser possível passar um estudante inativo/inexistente
  - [X] Deve verificar o id do estudante com id presente no token
  - [X] Deve verificar a validade do token
 

### Post

- [X] Criar post
- [] Editar post
 - [] Deve ser possível editar o conteúdo do post
- [] Deletar post
- [] Buscar posts
- [] Buscar posts por aluno

### ComentarioPostagem

- [] Criar comentário
- [] Editar comentário
- [] Deletar comentário

### Reacaodepoimento

- [] Criar reação
- [] Deletar reação
