import { useRef, useState } from 'react'
import withResults from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'
import { searchMovies } from '../services/movies'



export function useMovies ({search}) {
    // Custom Hook que se encarga del fetch y de retornar los datos
    //const [responseMovies, setResponseMovies] = useState([])
    //const movies = responseMovies.Search

    // Se lleva toda esta logica a un service en movie.js
    // Mapeamos el contrato del fetch hacia un objeto del componente para desacoplar el formato de respuesta que le pasamos al componente Movies
    // const mappedMovies = movies?.map( movie => ({
    // id: movie.imdbID,
    // title: movie.Title,
    // year: movie.Year,
    // poster: movie.Poster
    // }))

    // const getMovies = () => {
    //     if (search) {
    //         // setResponseMovies(withResults)
    //         fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=1f0ff54e&s=${search}`)
    //         .then(res=> res.json())
    //         .then(json=> {
    
    //             setResponseMovies(json)
    //         })
    //     }else{
    //         setResponseMovies(withoutResults)
    //     }
    // }

    // Devuelvo un objeto con una propiedad llamada movies (una lista) a la cual le asigno lo que tenga mapped movies.
    // Parecido al formato clave valor de json ya que se le podria agregar otras propiedades al return y recupearlas por el valor 
   
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)
    
    const getMovies = async () => {
        if(search===previousSearch.current) return

        try{
            setLoading(true)
            setError(null)
            previousSearch.current = search
            const newMovies = await searchMovies({search})
            setMovies(newMovies)

        }catch(e){
            setError(e.message)
        }finally{
            // Esto se ejecuta tanto en el try como en el catch
            setLoading(false)
        }
        
    }
   
   
    return { movies , loading, getMovies}
}