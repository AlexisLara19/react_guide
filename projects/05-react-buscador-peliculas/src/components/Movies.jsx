export function ListOfMovies ({movies}) {
  // Lista desorganizada de elementos  
  return (
        <ul className="movies">{
          movies.map(movie => (
            <li className="movie" key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img src={movie.poster} alt={movie.title}></img>
            </li>
          ))
          }
        </ul>
    )
}

export function NoMoviesResult(){
  return(
    <p1>No se ha encontrado resultados</p1>
  )
}

export function Movies ({movies}){
     const hasMovies = movies?.length > 0

     // Renderizado condicional
    return (
        
        hasMovies ? (
          <ListOfMovies movies={movies}></ListOfMovies>
        ) : (
          <NoMoviesResult></NoMoviesResult>
        )
        
    )
}