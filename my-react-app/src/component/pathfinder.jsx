import { useState } from 'react'
import React,{Component} from 'react';
import Node from './node/node';

import './pathfinder.css';
import { useEffect } from 'react';



const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 14;
const FINISH_NODE_COL = 49;


function createinitialgrid () {
  const grid = [];
  for (let row = 0; row < 15; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

function createNode (col, row) {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    // distance: Infinity,
    // isVisited: false,
    // isWall: false,
    // previousNode: null,
  };
};


function PathFinder () {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(()=>{
    const initialgrid=createinitialgrid();
    setGrid(initialgrid);
  },[]);

  
    return (
      <>
        <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const {col, isFinish, isStart} = node;
              return (
                <Node 
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                ></Node>
              );
            })}
          </div>
        ))}
      </div>
      </>
    );
  };
  
  export default PathFinder;