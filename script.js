// Função para limpar todos os campos, mostrar o botão de codificação novamente e ocultar o botão de decodificação
function resetFields() {
    document.getElementById('input').value = '';
    document.getElementById('freq_table').innerHTML = '';
    document.getElementById('codes_table').innerHTML = '';
    document.getElementById('bit_code').innerHTML = '';
    document.getElementById('graph_draw').innerHTML = '';
    document.getElementById('compression_ratio').innerHTML = '';
    document.getElementById('decodeStep_btn').style.display = 'none';
    document.getElementById('show_tree_btn').style.display = 'none';
    document.getElementById('encode_btn').style.display = 'block';
    estadoAtual.nivel = 0; // Reseta o nível da árvore
}

//Estrutura Nó - árvore binaria de busca (BST)
function Node(data, bit, left, right, freqSum = 0){ 
    this.data = data;
    this.bit = bit;
    this.left = left; 
    this.right = right; 
    this.freqSum = freqSum;
    this.show = show;
    this.insert = insert;
}
//Permite acessar e exibir o dado contido em um nó específico da árvore.
function show() { 
    return this.data; 
} 

//Insere elementos na arvore, tendo em conta, que deve partir os arrays +- a meio confor-me as probabilidades (ver calcSlice())
function insert(freq){
    var aux; // Array auxiliar para dividir as frequências
    var slice = calcSlice(freq) + 1; // Calcula o ponto de divisão do array de frequências
    var node_name = "";
    var freqSum = 0; // Inicializa a soma das frequências

    // Inserir à esquerda
    aux = freq.slice(0, slice); // Pega a primeira metade do array
    for(var i = 0; i < aux.length; i++){
        node_name = node_name.concat(aux[i][0]); // Concatena os caracteres
        freqSum += parseFloat(aux[i][1]); // Soma as frequências
    }
    this.left = new Node(node_name, 0, null, null, freqSum); // Passa freqSum para o novo nó

    if(aux.length > 1) // Se houver mais de um elemento no array
        this.left.insert(aux); // Chama recursivamente a função insert para o nó esquerdo

    var node_name = "";
    var freqSum = 0; // Reinicia a soma das frequências para o nó direito

    // Inserir à direita
    aux = freq.slice(slice, freq.length); // Pega a segunda metade do array
    for(var i = 0; i < aux.length; i++){
        node_name = node_name.concat(aux[i][0]);
        freqSum += parseFloat(aux[i][1]); // Soma as frequências
    }
    this.right = new Node(node_name, 1, null, null, freqSum.toFixed(3)); // Passa freqSum para o novo nó

    if(aux.length > 1)
        this.right.insert(aux); // Chama recursivamente a função insert para o nó direito
}

//Estrutura BST - árvore binaria de busca
function BST() { 
    this.root = null;
}

//Calcular onde se deve dividir o array de freq's
function calcSlice(data){
    var total = 0;
    for(var i=0;i<data.length;i++){
        total+=parseFloat(data[i][1]);
    }
    
    var soma = parseFloat(data[0][1]);
    var halfTotal = total/2;
    var j = 1;
    for(j=1;soma+parseFloat(data[j][1])<=halfTotal;j++){
        soma+=parseFloat(data[j][1]);
    }
    return j-1;
}

//Obter os códigos das folhas da árvore
function codigosFolhas(node, array, codigo="") {
    if(node.left != null) {
        codigosFolhas(node.left, array, codigo.concat("0"));
    }
    if(node.right != null) {
        codigosFolhas(node.right, array, codigo.concat("1"));
    }
    if(node.left == null && node.right == null) {
        array.push([node.show(), codigo]);
    }
}

//Cria uma arvore
function criaArvore(freq){
    var tree = new BST();
    var root_name = "";
    for(var i=0;i<freq.length;i++){
        root_name = root_name.concat(freq[i][0]);
    }
    var rootNode = new Node(root_name, null, null, null, 1);
    tree.root = rootNode;
    tree.root.insert(freq);
    
    return tree;
}

//Gerar tabela de freqs
function freqsTable(tableData){
    var table = document.createElement('table');
    var theader = document.createElement('thead');
    var tableBody = document.createElement('tbody');

    table.setAttribute('border', '1');
    theader.innerHTML = "<tr><th>Char</th><th>Freq.</th></tr>";

    tableData.forEach(function(rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });

    table.appendChild(theader);
    table.appendChild(tableBody);
    return table;
}

//Gerar tabela de codigos
function codesTable(tableData){
    var table = document.createElement('table');
    var theader = document.createElement('thead');
    var tableBody = document.createElement('tbody');

    table.setAttribute('border', '1');
    theader.innerHTML = "<tr><th>Char</th><th>Code</th></tr>";

    tableData.forEach(function(rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });

    table.appendChild(theader);
    table.appendChild(tableBody);
    return table;
}

//Criar uma arvore em JSON
let estadoAtual = {
    nivel: 0 // Nível atual que está sendo exibido
};

function buildTreeJSON(node, graph, nivel = 0, nivelAtual = 0, x = 0, y = 0, dx = 0.2, dy = 0.2, path = "") {
    if (nivelAtual > nivel) return; // Não constrói além do nível atual

    graph.nodes.push({
        id: node.show() + " (" + path + ")",
        label: node.show() + " (" + path + "), Freq: " + node.freqSum,
        x: x,
        y: y,
        size: 3
    });

    if (node.left != null) {
        var leftx = x - 5 - dx;
        var lefty = y + 5 + dy;
        buildTreeJSON(node.left, graph, nivel, nivelAtual + 1, leftx, lefty, dx - 1, dy - 1, path + "0");
        if (nivelAtual < nivel) {
            graph.edges.push({
                id: "el_" + node.show(),
                source: node.show() + " (" + path + ")",
                target: node.left.show() + " (" + path + "0)"
            });
        }
    }
    if (node.right != null) {
        var rightx = x + 5 + dx;
        var righty = y + 5 + dy;
        buildTreeJSON(node.right, graph, nivel, nivelAtual + 1, rightx, righty, dx - 1, dy - 1, path + "1");
        if (nivelAtual < nivel) {
            graph.edges.push({
                id: "er_" + node.show(),
                source: node.show() + " (" + path + ")",
                target: node.right.show() + " (" + path + "1)"
            });
        }
    }
}

// Função auxiliar para calcular a altura máxima da árvore
function calculaNivelMax(node, nivelAtual = 0) {
    if (node == null) return nivelAtual - 1;
    let alturaEsq = calculaNivelMax(node.left, nivelAtual + 1);
    let alturaDir = calculaNivelMax(node.right, nivelAtual + 1);
    return Math.max(alturaEsq, alturaDir);
}

function showTree(data) {
    if (estadoAtual.nivel > calculaNivelMax(criaArvore(sf_pp(data)).root)) {
        alert("A árvore já está completa."); 
        return;
    }

    document.getElementById('graph_draw').innerHTML = '';
    var freq = sf_pp(data); // Calcula as frequências
    var tree = criaArvore(freq); // Cria a árvore
    var graph = { nodes: [], edges: [] }; // Inicializa o grafo
    buildTreeJSON(tree.root, graph, estadoAtual.nivel); // Constrói o JSON do grafo
    graphSF(graph); // Atualiza o gráfico com o novo estado
    estadoAtual.nivel++; // Prepara para o próximo nível na próxima chamada
}

//Gerar o grafo
function graphSF(g){
    s = new sigma({
        graph : g,
        container: 'graph_draw',
        settings :{
            nodeColor : 'default',
            edgeColor : 'default',
            defaultNodeColor : '#00ff00',
            defaultEdgeColor : '#ff0000'
        }
    });
}

//Shannon Fano Pré-Processamento
function sf_pp(data){
    var freq = {};
    var alf = [];
    //calculo da frequencia de cada caractere
    for (var i=0; i<data.length;i++) {
        var character = data.charAt(i);
        if (freq[character]) {
            freq[character]++;
        } else {
            freq[character] = 1;
            alf.push(character);
        }
    }
    //calculo da probabilidade de cada caractere
    for (var i=0; i<alf.length;i++) {
        freq[alf[i]] = (freq[alf[i]]/data.length).toFixed(3);
    }
    //ordenação decrescente
    var sorted = [];
    for (var char in freq)
            sorted.push([char, freq[char]]);
    sorted.sort(function(a, b) {return b[1] - a[1];});
    return sorted;
}

//Converte um array em um objeto fazendo com que o primeiro elemento do array seja a chave e o segundo o valor
function arrayToObject(array){
    var Obj = {};
    for(var i=0;i<array.length;i++){
        Obj[array[i][0]]=array[i][1];
    }
    return Obj;
}

//Gerar o bit code a partir da string inicial
function compress(data, codes_ary){
    var bit_code = "";
    var codes = arrayToObject(codes_ary);
    for(var i=0;i<data.length;i++){
        bit_code += ""+codes[data[i]];
    }
    return bit_code;
}

//Shannon Fano
function shannon_fano(data){
    var freq = sf_pp(data); //calcula as frequencias
    document.getElementById('freq_table').appendChild(freqsTable(freq));
    var tree = criaArvore(freq); //cria a arvore binaria
    //Gera os códigos
    var codes = [];
    codigosFolhas(tree.root, codes);
    document.getElementById('codes_table').appendChild(codesTable(codes));
    //Comprime a String inicial em 0 e 1
    var bitCode = compress(data, codes);
    document.getElementById('bit_code').innerHTML = "Código: " + bitCode;
    document.getElementById('compression_ratio').innerHTML += "Compressão: " + CompRatio(data, bitCode) + '<br>' + 'Percentual de compressão: ' + CompRatio2(data, bitCode) + '%' + '<br>' + 'Quantidade de bits com SF ' + bitCode.length + '<br>' + 'Quantidade de bits sem SF:' + data.length*8;
    //Decodificação
    initDecode(bitCode, codes);
    document.getElementById('show_tree_btn').style.display = 'block';
    document.getElementById('decodeStep_btn').style.display = 'block';
    document.getElementById('encode_btn').style.display = 'none';
}

function CompRatio(original, compressed){
    aux = original.length*8; // 1 char = 8 bits
    return (aux/compressed.length).toFixed(2);
}
function CompRatio2(original, compressed){
    aux = original.length*8; // 1 char = 8 bits
    return ((1-(compressed.length/aux))*100).toFixed(2);
}

let decodeState = {
    bitCode: "",
    codesObj: {},
    tempCode: "",
    currentIndex: 0,
    decodedString: ""
};

function initDecode(bitCode, codes) {
    // Inicializa o estado com os novos dados
    decodeState.bitCode = bitCode;
    decodeState.codesObj = codes.reduce((obj, codePair) => {
        obj[codePair[1]] = codePair[0]; // Reverte chave/valor para decodificação
        return obj;
    }, {});
    decodeState.tempCode = "";
    decodeState.currentIndex = 0;
    decodeState.decodedString = "";
}

function decodeStep() {
    if (decodeState.currentIndex < decodeState.bitCode.length) {
        decodeState.tempCode += decodeState.bitCode[decodeState.currentIndex]; // Adiciona o bit atual ao tempCode
        if (decodeState.tempCode in decodeState.codesObj) { // Verifica se tempCode corresponde a algum código
            decodeState.decodedString += decodeState.codesObj[decodeState.tempCode]; // Anexa o caractere correspondente a decodedString
            decodeState.lastMatch = decodeState.tempCode; // Atualiza o último match
            decodeState.tempCode = ""; // Reseta tempCode para o próximo caractere
        }
        decodeState.currentIndex++;
        updateUI();
    } else {
        document.getElementById('bit_code').innerHTML = (`Código: ${decodeState.bitCode}<br>
            Decodificado: ${decodeState.decodedString}`);
        alert("Decodificação completa."); 
    }
}

//função para atualizar a interface
function updateUI() {
    document.getElementById('bit_code').innerHTML = (`Código: ${decodeState.bitCode}<br>
        Decodificado: ${decodeState.decodedString}<br>
        Bits restantes: ${decodeState.bitCode.substring(decodeState.currentIndex)}<br>
        Janela: ${decodeState.tempCode}<br>
        Último match: ${decodeState.lastMatch}`); // 
}
