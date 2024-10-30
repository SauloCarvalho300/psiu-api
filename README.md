# Psiu API

## Requisitos

### Aluno

- [x] Cadastrar aluno
  - [x] Não deve ser possível cadastrar RA já cadastrado
  - [x] Gerar senha aleatória para primeiro acesso
  - [x] Criar hash para a senha aleatória gerada

- [x] Editar aluno
  - [x] Deve ser possível alterar o nome e data de nascimento do aluno
  - [x] Não deve ser possível atualizar um student inativo
  
- [x] Atualizar senha
  - [x] Não deve ser possível colocar uma senha fraca
  - [x] Checar a senha atual do estudante
  - [x] Confirmar nova senha duas vezes

- [x] Deletar aluno
  - [x] Deve utilizar soft delete
  - [x] Não deve ser possível deletar um student inativo
  
- [x] Buscar alunos
  - [] Criar páginação

### Autenticação

- [x] Autenticação com senha
  - [x] Não deve ser posível autenticar um estudante inativo
  - [x] Verificar se o RA existe
  - [x] Criar um token de autenticação
- [x] Criar middleware de autenticação
  - [x] Não deve ser posível passar um estudante inativo/inexistente 
  - [x] Deve verificar o id do estudante com id presente no token
  - [x] Deve verificar a validade do token

### Post

- [x] Criar post
- [x] Editar post
  - [x] Dever ser possível editar o conteúdo do post
- [x] Deletar post
- [x] Buscar posts
  - [x] Incluir comentários
    - [] Incluir reações
  - [x] Incluir reações
  - [] Criar páginação
- [x] Buscar posts por aluno
  - [] Criar páginação

### ComentarioPost

- [x] Criar comentário
- [x] Editar comentário
- [x] Deletar comentário

### ReacaoPost

- [x] Criar reação para o post/comentário
  - [x] Apoio ❤️
  - [x] Entendo você 👐
  - [x] Força 💪
  - [x] Tristeza 😢
  - [x] Estamos juntos 🤝
- [x] Deletar reação post/comentário

### ReacaoComentario

- [x] Criar reação
  - [x] Apoio ❤️
  - [x] Entendo você 👐
  - [x] Força 💪
  - [x] Tristeza 😢
  - [x] Estamos juntos 🤝
- [x] Deletar reação
