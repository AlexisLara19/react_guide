import { useState, useEffect } from 'react' // UseEfect es un hook que te permite renderizar codigo arbitrario cada vez que un componente se monta en el DOM o se renderiza o cuando cambien las dependencias indicadas
import confeti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGameFrom } from './logic/board.js'
import './App.css'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'

function App () {
  // Los useState no pueden estar dentro de un if, while loop o anidados
  // const [board, setBoard] = useState(['x','x','x','x','o','x','x','x','x'])
  // const [board, setBoard] = useState(Array(9).fill(null))

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  // const [turn, setTurn] = useState(TURNS.X)
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)


  const updateBoard = (index) => {

    if (board[index] || winner) return

    // Creamos una nueva variable board
    const newBoard = [...board] //Se copia un nuevo board o el board actual??
    // Diferencia entre spred operator y escructurateClone.
    //Al nuevo board le ponemos la marca del jugador que esta en turno (x / o)
    newBoard[index] = turn
    setBoard(newBoard) // Esto es asincrono, por eso posteriormente se utiliza newBoard para pasarlo a la funcion

    // Calculamos el nuevo turno con base en el turno actual
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    const newWinner = checkWinnerFrom(newBoard) // Se le pasa al newBoard
    if (newWinner){
      setWinner(newWinner) // Este tipo de funciones son asincronas
       confeti()
      console.log(winner) // No es necesariamente el nuevo estado
    }
    else if (checkEndGameFrom(newBoard)){
      setWinner(false) //Empate
    }

  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  useEffect(() =>{
    console.log('Llama al useEffect')
  },[])
  
  return (
    <>
    <main className='board'>
      <h1> Tic tac toe</h1>
      <button onClick={resetGame}> Reset Game</button>
      
      <section className='game'>
        {
          // Map devuelve un array 
          board.map((_,index)=>{
            return (
              <Square
              key={index} 
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })

          // board.map((_,index)=>{
          //   return (
          //     <div className='cell' key={index}>
          //       <span className='cell__content'>
          //         {index}
          //       </span>
          //     </div>
          //   )
          // })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame = {resetGame}>
      </WinnerModal>
      {/* {
        winner !== null && (
          <>
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false ? 'Empate' : 'Gano: '
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>

            </div>
          </section>
          </>
        )
      } */}


    </main>

    
    </>
  )
}

export default App
