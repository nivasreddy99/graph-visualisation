import { buildAdjacencyListFromComponent } from "./graph.js";
import createMinHeap from "./minHeap.js";

const dijkstra = (adjacencyList, createFringe) => {
  const nodesCount = adjacencyList.length;

  const startNode = 0;
  const finishNode = nodesCount - 1;

  const fringe = new createFringe(nodesCount);
  const keys = new Array(nodesCount);
  const parents = new Array(nodesCount);
  const isInFringe = new Array(nodesCount);
  const steps = [];

  fringe.insert(0, 0);
  isInFringe[0] = true;
  keys[0] = 0;

  for (let i = 1; i < nodesCount; ++i) {
    fringe.insert(i, Infinity);
    isInFringe[i] = true;
    keys[i] = Infinity;
  }

  let subSteps = [];
  while (!fringe.isEmpty()) {
    const node = fringe.extractMin();
    isInFringe[node.key] = false;
    const neighbors = adjacencyList[node.key];

    if (parents[node.key]) {
      steps.push({
        from: parents[node.key].key,
        to: node.key,
        weight: node.value,
        subSteps: subSteps,
      });
    }

    if (node.key == finishNode) {
      break;
    }

    subSteps = [];
    neighbors.forEach((neighbor) => {
      if (isInFringe[neighbor.node]) {
        subSteps.push({
          from: node.key,
          to: neighbor.node,
          weight: neighbor.weight,
        });
        const newWeight = keys[node.key] + neighbor.weight;

        if (newWeight < keys[neighbor.node]) {
          keys[neighbor.node] = newWeight;
          parents[neighbor.node] = { key: node.key, weight: neighbor.weight };
          fringe.decreaseKey(neighbor.node, newWeight);
        }
      }
    });
  }

  const shortestPath = [];
  let node = finishNode;

  while (node != startNode) {
    shortestPath.push({
      from: parents[node].key,
      to: node,
      weight: parents[node].weight,
    });
    node = parents[node].key;
  }

  return {
    steps: steps,
    shortestPath: shortestPath,
    total: keys[finishNode],
  };
};

const transformResult = (result) => {
  return {
    steps: result.steps,
    shortestPath: result.shortestPath.reverse(),
    total: result.total,
  };
};

const dijkstraWrapper = (nodes, edges) => {
  const adjacencyList = buildAdjacencyListFromComponent(nodes, edges);
  const result = dijkstra(adjacencyList, createMinHeap);
  return transformResult(result);
};

export { dijkstra, dijkstraWrapper };
