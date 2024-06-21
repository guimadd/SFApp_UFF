# SFApp_UFF
Trabalho da Disciplina TCC00281 - FUNDAMENTOS DE SISTEMAS MULTIMÍDIA - A1 de criação de uma aplicação web para demonstrar a codificação de Shannon-Fano

Descrição das funções:

  resetFields: Limpa todos os campos e tabelas na interface do usuário, preparando para uma nova execução do algoritmo.
  
  Node: Define a estrutura de um nó utilizado na árvore binária. Cada nó armazena dados, um bit (0 ou 1, usado na compressão), referências para os nós filho à esquerda e à direita, e métodos para exibir os dados e inserir novos nós.
  
  BST (Binary Search Tree): Estrutura básica para a árvore binária, inicialmente com a raiz nula.
  
  getLeafsCodes: Percorre a árvore binária para obter os códigos de cada caractere (que são as folhas da árvore), concatenando "0" para movimento à esquerda e "1" para movimento à direita.
  
  createTree: Cria a árvore binária a partir de um array de frequências dos caracteres. Inicializa a árvore com um nó raiz contendo todos os caracteres.
  
  insert: Método para inserir elementos na árvore. Divide o array de frequências aproximadamente ao meio, baseado nas probabilidades, e cria nós filhos à esquerda e à direita com esses subconjuntos.
  
  freqsTable e codesTable: Geram tabelas HTML para exibir as frequências dos caracteres e seus respectivos códigos de compressão.
  
  buildTreeJSON: Constrói uma representação em JSON da árvore binária para visualização. Cada nó é adicionado com coordenadas específicas para facilitar a visualização gráfica.
  
  graphSF: Utiliza a biblioteca sigma para desenhar o grafo representando a árvore binária na interface do usuário.
  
  sf_pp (Shannon-Fano Pré-Processamento): Calcula as frequências de cada caractere na string de entrada e as ordena em ordem decrescente de frequência.
  
  calcSlice: Determina o ponto de divisão do array de frequências para equilibrar as somas das frequências dos subconjuntos esquerdo e direito.
  
  arrayToObject: Converte um array de pares chave-valor em um objeto para facilitar o acesso aos códigos de compressão.
  
  compress: Gera a string comprimida, substituindo cada caractere pelo seu código de compressão correspondente.
  
  shannon_fano: Função principal que executa o algoritmo de Shannon-Fano. Calcula as frequências dos caracteres, cria a árvore binária, gera os códigos de compressão, e finalmente comprime a string de entrada. Também atualiza a interface do usuário com as tabelas de frequências, códigos, e a visualização gráfica da árvore, além de exibir os botões para navegação entre etapas do processo.
