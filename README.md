# SFApp_UFF
Trabalho da Disciplina TCC00281 - FUNDAMENTOS DE SISTEMAS MULTIMÍDIA - A1 de criação de uma aplicação web para demonstrar a codificação de Shannon-Fano

Descrição das funções:

  resetFields(): Esta função limpa todos os campos e elementos HTML relacionados à exibição dos resultados da compressão e codificação. Ela também alterna a visibilidade dos botões de codificação e decodificação.
  
  Node(data, bit, left, right): Define um nó da árvore binária usada no algoritmo. Cada nó armazena dados, um bit (que pode ser 0 ou 1, mas é null para a raiz), referências para os nós filhos esquerdo e direito, e métodos para exibir os dados (show) e inserir novos nós (insert).
  
  show(): Método para retornar os dados armazenados em um nó.
  
  insert(freq): Método para inserir novos nós na árvore, baseado em um array de frequências. Ele divide o array em duas partes e cria nós filhos esquerdo e direito com essas partes.
  
  BST(): Define uma árvore binária de busca (Binary Search Tree - BST) com uma propriedade root que inicialmente é null.
  
  calcSlice(data): Calcula onde dividir o array de frequências para a construção da árvore, tentando manter as somas das frequências dos dois lados o mais equilibradas possível.
  
  codigosFolhas(node, array, codigo=""): Gera os códigos binários para cada caractere baseado na posição dos nós folha na árvore.
  
  criaArvore(freq): Cria a árvore binária a partir de um array de frequências.
  
  freqsTable(tableData) e codesTable(tableData): Geram tabelas HTML para exibir as frequências dos caracteres e seus códigos binários correspondentes, respectivamente.
  
  buildTreeJSON(node, graph, x=0, y=0, dx=0.2, dy=0.2, path=""): Constrói uma representação em JSON da árvore para visualização.
  
  graphSF(g): Utiliza a biblioteca sigma para desenhar o grafo representando a árvore binária na interface do usuário.
  
  sf_pp(data): Pré-processa os dados de entrada, calculando a frequência de cada caractere.
  
  arrayToObject(array): Converte um array de pares chave-valor em um objeto.
  
  compress(data, codes_ary): Comprime a string de entrada em uma sequência de bits usando os códigos gerados.
  
  shannon_fano(data): Função principal que executa o algoritmo de Shannon-Fano. Calcula as frequências, cria a árvore, gera os códigos para cada caractere, comprime a string de entrada e atualiza a interface do usuário com os resultados.
  
  CompRatio(original, compressed) e CompRatio2(original, compressed): Calculam a taxa de compressão e a porcentagem de compressão, respectivamente.


  
  decodeState: Um objeto usado para manter o estado durante a decodificação.
  
  initDecode(bitCode, codes): Inicializa o estado de decodificação com o código comprimido e os códigos dos caracteres.
  
  decodeStep(): Realiza um passo da decodificação, decodificando um bit por vez e atualizando a interface do usuário com o progresso.
