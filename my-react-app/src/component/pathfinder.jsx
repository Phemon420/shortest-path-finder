import React, { useState, useEffect } from 'react';
import Node from './node/node';
import './pathfinder.css';
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/djikstra';

const START_NODE_ROW = 7;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 7;
const FINISH_NODE_COL = 30;

function createInitialGrid() {
  const grid = [];
  for (let row = 0; row < 15; row++) {
    const currentRow = [];
    for (let col = 0; col < 40; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

function createNode(col, row) {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
}

function getNewGridWithWallToggled(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      if (node.isStart || node.isFinish) return;
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-visited';
    }, 10 * i);
  }
}

function animateShortestPath(nodesInShortestPathOrder) {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      if (node.isStart || node.isFinish) return;
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-shortest-path';
    }, 50 * i);
  }
}


function PathFinder() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
    const initialGrid = createInitialGrid();
    setGrid(initialGrid);
  }, []);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    // console.log(nodesInShortestPathOrder);
    // console.log(visitedNodesInOrder);
  };

  return (
    <>
      <button onClick={visualizeDijkstra}>Visualize Dijkstra's Algorithm</button>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { col, row, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  row={row}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseUp={handleMouseUp}
                ></Node>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );

}

export default PathFinder;