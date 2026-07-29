import { useEffect, useRef, useState } from 'react'

import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'


const API_URL_PREFIX = `http://www.omdbapi.com/?i=tt3896198&apikey=1f0ff54e`
// Error 500 al cargar la ultima imagen

function useSearch () {
  // Este Hook provoca que se renderice 4 veces el componente cada que cambia el input
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    } 

    if (search==='') {
      setError('No se puede buscar una pelicual vacia')  // TODO: atender este linter y por que solo me aparece a mi? Using setState synchronously  within an Effect can trigger cascading renders 
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }

    if (search.length <3) {
      setError('La busqueda debe de tener al menos 3 caracteres')
      return
    }

    setError(null)
  },[search])

  return {search, updateSearch, error}
}

function App() {
  
  //const inputRef = useRef()
  //const [error, setError] = useState(null)
  const {search, updateSearch, error} = useSearch()
  const {movies, loading, getMovies} = useMovies({search})

  // -------- FORMA CONTROLADA ----------------------------------------------------------------
  //const [query, setQuery] = useState()

  console.log('render') //Este render nos indica que con la forma controlada se renderiza cada que cambia el input. Solo con forma controlada? Ayuda un poco con la validacion de formularios
  
  const handleSubmit = (event) => {
    event.preventDefault()
    //console.log({query})
    //console.log({search})
    getMovies()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }
  // const handleChange = (event) => {
  //   // Esta opcion si funciona
  //   // TODO: Pararlo a un Custom Hook
  //   const newQuery = event.target.value

  //   if (newQuery.startsWith(' ')) return
  //   setQuery(event.target.value)
  //   // Se puede realizar una validacion directamente aqui o con un useEffect condicionado al cambio de la variable query
  //   //SOT para hacer validaciones
  //   if (newQuery==='') {
  //     setError('No se puede buscar un campo vacio')
  //     return
  //   }

  //   if (newQuery.match(/^\d+$/)) {
  //     setError('No se puede buscar un campo un numero')
  //     return
  //   }

  //   if (newQuery.length <3) {
  //     setError('La busqueda debe de tener al menos 3 caracteres')
  //     return
  //   }

  //   setError(null)

  // }

  // useEffect(() => {
  //   //No funciona ya que da un error de sincronizacion
  //   //SOT para hacer validaciones
  //   if (query==='') {
  //     setError('No se puede buscar una pelicual vacia')
  //     return
  //   }

  //   if (query.match(/^\d+$/)) {
  //     setError('No se puede buscar una pelicula con un numero')
  //     return
  //   }

  //   if (query.length <3) {
  //     setError('La busqueda debe de tener al menos 3 caracteres')
  //     return
  //   }

  //   setError(null)
  // },[query])

  // --------- DOS FORMAS NO CONTROLADAS (sin utilizar el useState de query y setQuery) ------------------------------------------
  // //const handleSubmit = (event) => {
  //   event.preventDefault()
  //   // Persistencia del valor en el console log solo hasta que se utiliza como submit ?
  //   const input = inputRef.current // El elemento del DOM (el input)
  //   const value = input.value // El valor dentro del elemento
  //   console.log(value)
  // }

  // Submit sin utilizar el Hook, solo javascript
  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const fields = new.window.FormData(event.target)
  //   const query = fields.get('query')
  //   console.log(query)
  // Con multiples inputs, se devuelve un objeto (key: value) 
  // const fields = Object.fromEntries(new.window.FormData(event.target))
  // }

  return ( 
    <>
    <div className='page'>
      <header>
        <h1> Buscador </h1>

        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Example 1, example 2 ...'></input>
          <button type='submit'> Buscar </button>
        </form>
        { error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        
      </main>
        {loading ? <p>Cargando ...</p> : <Movies movies={movies}></Movies>}
      <footer>
      </footer>
    </div>
    </>
  )
}

export default App
