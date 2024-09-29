'use client';
import React, { useEffect, useState } from 'react'
import {Rabbit, Turtle} from 'lucide-react';

const gameInit: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

function TicTacToe() {

    const [gameBoard, setGameBoard] = useState<number[][]>(gameInit);
    const [turn, setTurn] = useState<1 | 2>(1);
    const [click, setClick] = useState<number>(0);

    useEffect(() => {        
        // check each row 
        for(let r = 0; r < 3; r++){
            let item = gameBoard[r][0];
            if(item == 0) continue;
            let found = true;
            for (let c = 0; c < 3; c++) {
                if(gameBoard[r][c] != item){
                    found = false;
                    break;
                }
            }
            if(found){
                alert(`winner found: ${item}`)
                setGameBoard(gameInit);
                setTurn(1);
            }
        }

        // check each col         
        for(let c = 0; c < 3; c++){
            let item = gameBoard[0][c];
            if(item == 0) continue;
            let found = true;
            for (let r = 0; r < 3; r++) {
                if(gameBoard[r][c] != item){
                    found = false;
                    break;
                }
            }            
            if(found){
                alert(`winner found: ${item}`)
                setGameBoard(gameInit);
                setTurn(1);
            }
        }

        // check diagnol 
        let item = gameBoard[0][0];
        let found = true;
        if(item != 0){
            for(let i = 0; i < 3; i++){
                if(gameBoard[i][i] != item){
                    found = false;
                    break;
                }
            }
            if(found){
                alert(`winner found: ${item}`)
                setGameBoard(gameInit);
                setTurn(1);
            }
        }

            
        item = gameBoard[0][2];
        found = true;
        if(item != 0){
            for(let i = 0; i < 3; i++){
                if(gameBoard[i][2-i] != item){
                    found = false;
                    break;
                }
            }
            
            if(found){
                alert(`winner found: ${item}`)
                setGameBoard(gameInit);
                setTurn(1);
            }
        }

    }, [gameBoard]) 

    useEffect(() => {        
        if(click == 9){
            setGameBoard(gameInit);
            setTurn(1)
            setClick(0);
        }
    }, [click])


    const updateGameBoard = (row: number, col: number, value: number) => {
        setGameBoard((prevBoard) => {
          const newBoard = prevBoard.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
          );
          return newBoard;
        });
    };

    function handleClick(row: number, col: number){

        if(gameBoard[row][col] != 0) return;

        updateGameBoard(row, col, turn);

        setTurn((prev: 1 | 2) => {
            return prev === 1 ? 2 : 1;
        });
        
        setClick(click+1);
    }

  return (
    <div className='min-h-screen min-w-screen bg-gradient-to-tr from-indigo-600  to-purple-500 flex justify-center items-center'>
        <div className='h-[30rem] w-[30rem] border-4 grid grid-rows-3'>
            {
                gameBoard.map((row: number[], rowInd: number) => {
                    return <div key={rowInd.toString()} className='grid grid-cols-3'>
                        { 
                            row.map((col: number, colInd: number) => {
                                return <div 
                                key={colInd.toString()}
                                className='border-4 flex justify-center items-center'
                                onClick={() => handleClick(rowInd, colInd)}>
                                        <h1>{col == 0 ? "" : col == 1 ? <Rabbit /> : <Turtle />}</h1>
                                        </div>
                            })
                        }
                    </div>
   
                })
            }
        </div>
    </div>
  )
}

export default TicTacToe