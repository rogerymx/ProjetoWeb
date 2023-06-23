// Função para adicionar uma nova postagem
function adicionarPostagem(event) {
  event.preventDefault();

  // Obtém os valores dos campos de input
  var titulo = document.getElementById('titulo').value;
  var imagem = document.getElementById('imagem').value;
  var data = document.getElementById('data').value;
  var conteudo = document.getElementById('conteudo').value;

  if(titulo.length >= 3 && titulo.length != null &&
    imagem.length >= 3 && imagem.length != null &&
    data.length >= 3 && data.length != null &&
    conteudo.length >= 3 && conteudo.length != null){
      // Cria um objeto postagem com os valores
      var postagem = {
        titulo: titulo,
        imagem: imagem,
        data: data,
        conteudo: conteudo
      };
    
      // Verifica se já existem postagens no Local Storage
      var postagens = JSON.parse(localStorage.getItem('postagens')) || [];
    
      // Adiciona a nova postagem à lista de postagens
      postagens.push(postagem);
    
      // Salva a lista de postagens atualizada no Local Storage
      localStorage.setItem('postagens', JSON.stringify(postagens));
    
      // Limpa os campos de input
      document.getElementById('titulo').value = '';
      document.getElementById('imagem').value = '';
      document.getElementById('data').value = '';
      document.getElementById('conteudo').value = '';

      exibirPostagens();
  }else{
    alert("Preencha todos os campos!");
  }
}

// Função para buscar postagens por título ou conteúdo
function buscarPostagens() {
  var searchTerm = document.getElementById('searchInput').value.toLowerCase();

  // Obtém a lista de postagens do Local Storage
  var postagens = JSON.parse(localStorage.getItem('postagens')) || [];

  // Filtra as postagens com base no termo de busca
  var postagensFiltradas = postagens.filter(function filtrar(postagem) {
    return postagem.titulo.toLowerCase().includes(searchTerm) ||
           postagem.conteudo.toLowerCase().includes(searchTerm);
  });

  // Atualiza a exibição das postagens
  exibirPostagens(postagensFiltradas);
}

// Função para exibir as postagens no elemento com id "postagens"
function exibirPostagens(postagens) {
  var container = document.getElementById('postagens');
  container.innerHTML = '';

  // Obtém a lista de postagens do Local Storage
  postagens = postagens || JSON.parse(localStorage.getItem('postagens')) || [];

  // Itera sobre as postagens e cria a estrutura HTML para exibi-las
  postagens.forEach(function(postagem, index) {
    var postagemDiv = document.createElement('div');
    postagemDiv.className = 'postagem';

    var tituloH3 = document.createElement('h3');
    tituloH3.textContent = postagem.titulo;

    var imagemImg = document.createElement('img');
    imagemImg.src = postagem.imagem;

    var dataP = document.createElement('p');
    dataP.textContent = postagem.data;

    var conteudoP = document.createElement('p');
    conteudoP.textContent = postagem.conteudo;

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.className = 'button-delete';
    deleteButton.addEventListener('click', function() {
      deletarPostagem(index);
    });

    var editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', function() {
      editarPostagem(index);
    });

    postagemDiv.appendChild(tituloH3);
    postagemDiv.appendChild(imagemImg);
    postagemDiv.appendChild(dataP);
    postagemDiv.appendChild(conteudoP);
    postagemDiv.appendChild(deleteButton);
    postagemDiv.appendChild(editButton);

    container.appendChild(postagemDiv);
  });
}

// Função para deletar uma postagem
function deletarPostagem(index) {
  // Obtém a lista de postagens do Local Storage
  var postagens = JSON.parse(localStorage.getItem('postagens')) || [];

  // Remove a postagem com o índice fornecido
  postagens.splice(index, 1);

  // Salva a lista de postagens atualizada no Local Storage
  localStorage.setItem('postagens', JSON.stringify(postagens));

  // Atualiza a exibição das postagens
  exibirPostagens();
}

// Função para editar uma postagem
function editarPostagem(index) {
  // Obtém a lista de postagens do Local Storage
  var postagens = JSON.parse(localStorage.getItem('postagens')) || [];

  // Obtém a postagem a ser editada
  var postagem = postagens[index];

  // Solicita ao usuário os novos valores
  var novoTitulo = prompt('Novo título:', postagem.titulo);
  var novaImagem = prompt('Nova imagem URL:', postagem.imagem);
  var novaData = prompt('Nova data:', postagem.data);
  var novoConteudo = prompt('Novo conteúdo:', postagem.conteudo);

  if(novoTitulo.length >= 3 && novoTitulo.length != null &&
    novaImagem.length >= 3 && novaImagem.length != null &&
    novaData.length >= 3 && novaData.length != null &&
    novoConteudo.length >= 3 && novoConteudo.length != null){
       // Atualiza os valores da postagem
      postagem.titulo = novoTitulo;
      postagem.imagem = novaImagem;
      postagem.data = novaData;
      postagem.conteudo = novoConteudo;
    
      // Salva a lista de postagens atualizada no Local Storage
      localStorage.setItem('postagens', JSON.stringify(postagens));
      // Atualiza a exibição das postagens
      exibirPostagens();
    }else{
      alert('Preencha os campos corretamente!');
  }

}

// Event listener para o formulário de inclusão de postagens
document.getElementById('postForm').addEventListener('submit', adicionarPostagem);

// Event listener para o campo de busca de postagens
document.getElementById('searchInput').addEventListener('input', buscarPostagens);

// Exibe as postagens inicialmente
exibirPostagens();
