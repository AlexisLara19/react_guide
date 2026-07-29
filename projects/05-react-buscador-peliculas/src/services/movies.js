const API_KEY = '1f0ff54e'

export const searchMovies = async ({search}) => {
    // NUNCA SE LE PASA EL ESTADO (setstate), SOLO SE RETORNAN COSAS

    if (search === '') return null
    
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const movies = json.Search

        return movies?.map( movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
            }))

    }catch(e) {
        throw new Error('Error buscando elementos')
    }

    // Esto viene originalmente de useMovies.js
    // if (search) {
    //     // setResponseMovies(withResults)
    //     return fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${search}`)
    //     .then(res=> res.json())
    //     .then(json=> {
    //         setResponseMovies(json)
    //     })
    // }else{
    //     return setResponseMovies(withoutResults)
    // }
}