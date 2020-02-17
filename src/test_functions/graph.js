class Node {
  constructor(name) {
    this.name = name;
    this.connected = [];
  }

  connect(node) {
    this.connected.push(node);
    node.connected.push(this);
  }

  includesNode(node) {
    if (this.connected.find(n => n.name === node.name) === undefined)
      return false;
    return true;
  }
}

function generate_nodes() {
  let nodes = [];

  // Random [4, 26]
  const amount = Math.floor(Math.random() * 23) + 4;
  for (let i = 97; i < 123; i++) {
    const char = String.fromCharCode(i);
    const node = new Node(char);
    nodes.push(node);
  }

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * 26);
    nodes.splice(randomIndex, 1);
  }

  return nodes;
}

function generate_edge_amount(amount) {
  const max = (amount * (amount - 1)) / 2;
  const min = amount - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function filter_out_full_nodes(nodes, graph) {
  const newGraph = graph.filter(
    node => node.connected.length !== nodes.length - 1
  );

  return newGraph;
}

function get_edge_amount(graph) {
  let connectionAmount = 0;
  for (let i = 0; i < graph.length; i++) {
    connectionAmount += graph[i].connected.length;
  }

  return connectionAmount / 2;
}

function get_edges(graph) {
  let edges = [];
  for (let i = 0; i < graph.length; i++) {
    const node1 = graph[i];
    for (let j = 0; j < node1.connected.length; j++) {
      const node2 = node1.connected[j];
      let tuple = [node1.name, node2.name];
      let includes = false;

      for (let k = 0; k < edges.length; k++) {
        if (edges[k].isSameWith(tuple) || edges[k].isSameWith(tuple.reverse()))
          includes = true;
      }

      if (!includes) edges.push(tuple.reverse());
    }
  }

  return edges;
}

function generate_connected_graph(nodes) {
  let graph = [];
  let copyNodes = [...nodes];
  const amount = nodes.length;

  // Add initial node
  const initNode = nodes.pickRandom();
  graph.push(initNode);
  nodes.splice(nodes.indexOf(initNode), 1);

  while (nodes.length !== 0) {
    const newNode = nodes.pickRandom();
    const nodeInGraph = graph.pickRandom();

    newNode.connect(nodeInGraph);
    graph.push(newNode);

    nodes.splice(nodes.indexOf(newNode), 1);
  }

  const totalEdgeAmount = generate_edge_amount(amount);
  const currentEdgeAmount = get_edge_amount(graph);
  const extraEdgeAmount = totalEdgeAmount - currentEdgeAmount;

  let newGraph;
  for (let i = 0; i < extraEdgeAmount; i++) {
    newGraph = filter_out_full_nodes(copyNodes, graph);
    if (newGraph.length !== 0) {
      const node1 = newGraph.pickRandom();
      let node2;
      do {
        node2 = newGraph.pickRandom();
      } while (node1.includesNode(node2) || node1.name === node2.name);

      node1.connect(node2);
    }
  }

  return graph;
}

module.exports = function() {
  let tests = [];
  let nodes;

  for (let i = 0; i < 50; i++) {
    nodes = generate_nodes();
    const graph = generate_connected_graph(nodes);
    const tape = generate_tape(graph);

    tests.push({
      tape,
      expected: true
    });
  }

  // 2 disconnected gropus
  for (let i = 0; i < 17; i++) {
    nodes = generate_nodes();
    const subArrays = generate_sub_arrays(nodes, 2);
    let nodes1 = subArrays[1];
    let nodes2 = subArrays[2];

    const graph1 = generate_connected_graph(nodes1);
    const graph2 = generate_connected_graph(nodes2);

    const graph = graph1.concat(graph2);
    const tape = generate_tape(graph);

    tests.push({
      tape,
      expected: false
    });
  }

  // 3 disconnected groups
  for (let i = 0; i < 17; i++) {
    nodes = generate_nodes();
    const subArrays = generate_sub_arrays(nodes, 3);
    let nodes1 = subArrays[1];
    let nodes2 = subArrays[2];
    let nodes3 = subArrays[3];

    const graph1 = generate_connected_graph(nodes1);
    const graph2 = generate_connected_graph(nodes2);
    const graph3 = generate_connected_graph(nodes3);

    const graph = graph1.concat(graph2).concat(graph3);
    const tape = generate_tape(graph);

    tests.push({
      tape,
      expected: false
    });
  }

  // 4 disconnected groups
  for (let i = 0; i < 16; i++) {
    nodes = generate_nodes();
    const subArrays = generate_sub_arrays(nodes, 4);
    let nodes1 = subArrays[1];
    let nodes2 = subArrays[2];
    let nodes3 = subArrays[3];
    let nodes4 = subArrays[4];

    const graph1 = generate_connected_graph(nodes1);
    const graph2 = generate_connected_graph(nodes2);
    const graph3 = generate_connected_graph(nodes3);
    const graph4 = generate_connected_graph(nodes4);

    const graph = graph1
      .concat(graph2)
      .concat(graph3)
      .concat(graph4);
    const tape = generate_tape(graph);

    tests.push({
      tape,
      expected: false
    });
  }

  return tests;
};

function generate_tape(graph) {
  let edges = get_edges(graph);
  edges.shuffle();
  const tape = {};
  for (let i = 0; i < edges.length; i++) {
    for (let j = 0; j < 2; j++) {
      tape[`${i} ${j}`] = edges[i][j];
    }
  }

  return tape;
}

function generate_sub_arrays(nodes, groupNum) {
  const subs = {};
  for (let i = groupNum; i > 1; i--) {
    let subArray = [];
    const reserved = i - 1;
    const max = nodes.length - reserved;
    const min = 1;
    const amount = Math.floor(Math.random() * (max - min + 1)) + min;
    for (let i = 0; i < amount; i++) {
      const element = nodes.pickRandom();
      const index = nodes.indexOf(element);
      nodes.splice(index, 1);
      subArray.push(element);
    }
    subs[i] = subArray;
  }
  subs[1] = nodes;

  return subs;
}
