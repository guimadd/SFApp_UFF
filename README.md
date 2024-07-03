Shannon-Fano Compression and Visualization

Este projeto implementa o algoritmo de compressão Shannon-Fano para codificação e decodificação de dados, além de visualização da árvore de codificação usando a biblioteca Sigma.js.
Descrição

O algoritmo de Shannon-Fano é utilizado para compressão de dados baseado na frequência de ocorrência dos caracteres. Este projeto oferece uma implementação completa do algoritmo, permitindo que o usuário insira uma string de dados e visualize o processo de codificação e a estrutura da árvore de codificação passo a passo. Além disso, inclui funcionalidades de decodificação para reconstruir a string original a partir da sequência binária comprimida.
Funcionalidades

    Compressão de Dados: Converte uma string de dados em uma sequência binária comprimida usando o algoritmo Shannon-Fano.
    Decodificação de Dados: Reconstrói a string original a partir da sequência binária comprimida utilizando a árvore de codificação gerada.
    Visualização da Árvore de Codificação: Constrói a árvore de codificação passo a passo e a visualiza usando Sigma.js.
    Cálculo da Taxa de Compressão: Calcula a taxa de compressão alcançada pelo algoritmo em relação aos dados originais.

Estrutura do Projeto

    index.html: Página web principal que contém os elementos de interface de usuário e inclui o script.js.
    script.js: Script JavaScript que contém a lógica de implementação do algoritmo Shannon-Fano, visualização da árvore de codificação usando Sigma.js, decodificação de dados e manipulação de eventos da interface de usuário.
    sigma.min.js: Biblioteca Sigma.js utilizada para renderizar e manipular grafos na interface de usuário.
    style.css: Arquivo de estilo CSS para definir o layout e o design da página web.

Como Usar

    Clone ou faça o download do repositório para o seu ambiente local.
    Abra o arquivo index.html em um navegador web compatível.
    Insira a string de dados desejada no campo de entrada e clique no botão "Codificar".
    A tabela de frequências, a árvore de codificação e a sequência binária comprimida serão exibidas na página.
    Para visualizar a árvore de codificação passo a passo, clique no botão "Mostrar Árvore".
    Para decodificar a sequência binária comprimida, clique no botão "Decodificar Passo a Passo".

Dependências

    Sigma.js: Biblioteca JavaScript para renderização de grafos interativos.
    Browser compatível com HTML5: Navegador web moderno compatível com HTML5 e JavaScript.

Autores

    Daniel Ribeiro Guimarães
    Rafael Zuma
