import { WINER_COMBOS } from "../constants"


export const checkWinnerFrom = (boardToCheck) =>{
    // Recorremos las listas de arrays para revisar todas las combinaciones ganadoras
    for (const combo of WINER_COMBOS){
      //Tomamos la n combinacion ganadora
      const [a,b,c] = combo
      if(
        boardToCheck[a] && // Revisamos si existe algo en la primera posicion que dicta la lista 
        boardToCheck[a] === boardToCheck[b] && // Revisamos si el valor del primero es igual al valor de la segunda posicion de la lista
        boardToCheck[a] === boardToCheck[c] // Revisamos si el valor de la primera posicion es igual al valor de tercera posicion de la lista
      ){
        return boardToCheck[a]
      }
    }

    // Si no encuentra alguna combinacion ganadora se regresa null
    return null

  }

export const checkEndGameFrom = (newBoard) => {
    // Revisamos si no existen espacios vacios
    // Si todos los elementos dentro de newBoard son diferentes de null
    return newBoard.every((square) => square !== null)
  }