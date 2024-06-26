// Função para limpar todos os campos
function resetFields() {
    document.getElementById('input').value = '';
    document.getElementById('freq_table').innerHTML = '';
    document.getElementById('codes_table').innerHTML = '';
    document.getElementById('bit_code').innerHTML = '';
    document.getElementById('graph_draw').innerHTML = '';
    document.getElementById('prev_step_btn').style.display = 'none';
    document.getElementById('next_step_btn').style.display = 'none';
    document.getElementById('compression_ratio').innerHTML = '';
}

//Estrutura Nó
function Node(data, bit, left, right){ 
    this.data   = data;
    this.bit    = bit;
    this.left   = left; 
    this.right  = right; 
    this.show   = show;
    this.insert = insert;
} 
function show() { 
    return this.data; 
} 

//Estrutura BST - árvore binaria de busca
function BST() { 
    this.root = null;
}

//Obter os códigos dos caracteres (que por acaso são as folhas da arvore)
function getLeafsCodes(node, array, code="") {
    if(node.left != null) {
        getLeafsCodes(node.left, array, code.concat("0"));
    }
    if(node.right != null) {
        getLeafsCodes(node.right, array, code.concat("1"));
    }
    if(node.left == null && node.right == null) {
        array.push([node.show(), code]);
    }
}

//Cria uma arvore
function createTree(freq){
    var tree = new BST();
    var root_name = "";
    for(var i=0;i<freq.length;i++){
        root_name = root_name.concat(freq[i][0]);
    }
    var rootNode = new Node(root_name, null, null, null);
    tree.root = rootNode;
    tree.root.insert(freq);
    
    return tree;
}

//Insere elementos na arvore, tendo em conta, que deve partir os arrays +- a meio confor-me as probabilidades (ver calcSlice())
function insert(freq){
    var aux;
    var slice = calcSlice(freq)+1;
    var node_name = "";
    //Inserir à esquerda
    aux = freq.slice(0, slice);
    for(var i=0;i<aux.length;i++){
        node_name = node_name.concat(aux[i][0]);
    }
    this.left = new Node(node_name, 0, null, null);
    if(aux.length>1)
        this.left.insert(aux);
    var node_name = "";
    //Inserir à direita
    aux = freq.slice(slice, freq.length);
    for(var i=0;i<aux.length;i++){
        node_name = node_name.concat(aux[i][0]);
    }
    this.right = new Node(node_name, 1, null, null);
    if(aux.length>1)
        this.right.insert(aux);
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
function buildTreeJSON(node, graph, x=0, y=0, dx=0.2, dy=0.2, path=""){
    graph.nodes.push({
        id: node.show() + " (" + path + ")",
        label: node.show() + " (" + path + ")",
        x: x,
        y: y,
        size: 3
    });
    if(node.left != null) {
        var leftx = (x+(dx*-1))-5;
        var lefty = (y+dy)+5;
        buildTreeJSON(node.left, graph, leftx, lefty, dx-1, dy-1, path + "0");
        graph.edges.push({
            id: "el_"+node.show(),
            source: node.show() + " (" + path + ")",
            target: node.left.show() + " (" + path + "0)"
        });
    }
    if(node.right != null) {
        var rightx = (x+dx)+5;
        var righty = (y+dy)+5;
        buildTreeJSON(node.right, graph, rightx, righty, dx-1, dy-1, path + "1");
        graph.edges.push({
            id: "er_"+node.show(),
            source: node.show() + " (" + path + ")",
            target: node.right.show() + " (" + path + "1)"
        });
    }
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
    for (var i=0; i<data.length;i++) {
        var character = data.charAt(i);
        if (freq[character]) {
            freq[character]++;
        } else {
            freq[character] = 1;
            alf.push(character);
        }
    }
    for (var i=0; i<alf.length;i++) {
        freq[alf[i]] = (freq[alf[i]]/data.length).toFixed(3);
    }
    var sorted = [];
    for (var char in freq)
            sorted.push([char, freq[char]]);
    sorted.sort(function(a, b) {return b[1] - a[1];});
    return sorted;
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

//Converter array em Objeto{key=>value}
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
    var freq = sf_pp(data);
    //imprime a tabela de frequencias
    document.getElementById('freq_table').appendChild(freqsTable(freq));
    //cria a arvore binaria
    var tree = createTree(freq);
    //Imprimir a arvore
    var graph = {nodes:[],
                    edges:[]};
    buildTreeJSON(tree.root, graph);
    graphSF(graph);
    //Gera códigos
    var codes = [];
    getLeafsCodes(tree.root, codes);
    document.getElementById('codes_table').appendChild(codesTable(codes));
    //Comprime a String inicial em 0 e 1
    var bitCode = compress(data, codes);
    document.getElementById('bit_code').innerHTML = "Resultado: " + bitCode;
    document.getElementById('compression_ratio').innerHTML += "Compressão: " + CompRatio(data, bitCode) + '<br>' + 'Percentual de compressão: ' + CompRatio2(data, bitCode) + '%';
    // Mostra os botões "Etapa Anterior" e "Próxima Etapa"
    var prevStepBtn = document.getElementById('prev_step_btn');
    prevStepBtn.style.display = 'inline-block'; // Mostra o botão
    var nextStepBtn = document.getElementById('next_step_btn');
    nextStepBtn.style.display = 'inline-block'; // Mostra o botão
}
function CompRatio(original, compressed){
    aux = original.length*8; // 1 char = 8 bits
    return (aux/compressed.length).toFixed(2);
}
function CompRatio2(original, compressed){
    aux = original.length*8; // 1 char = 8 bits
    return ((1-(compressed.length/aux))*100).toFixed(2);
}
