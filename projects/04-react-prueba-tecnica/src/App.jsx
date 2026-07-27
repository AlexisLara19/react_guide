import { useEffect, useState } from "react"
import { getRandomFact } from "./services/fact"
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
	const [fact, setFact] = useState()
	const [imageUrl, setImageUrl] = useState()
	//const [factError, setFactError] = useState()


	// NO USAR FETCH AQUI (fuera del usefect) YA QUE PROVOCARIA UN LOOP INIFITO(?)
	// La primera vez que se monte nuestro componente en el DOM se hace el fetching de datos
	// Otras opciones a fetch (no siempre permitidas son ReactQuery, SWR, axios, apollo)
	// El fetch te devuelve una promesa y el res.json tambien, por eso se concatenan
	// useEffect (() => {
	// 	fetch(CAT_ENDPOINT_RANDOM_FACT)
	// 	.then(res => {
	// 		// TODO: Handle error id !res.ok
	// 		// if (!res.ok) throw new Error('Error fetching')
	// 		if (!res.ok){
	// 			setFactError('No se ha podido recuperar la cita')
	// 		}
	// 		return res.json()
	// 	})
	// 	.then(data => {
	// 		const { fact } = data
	// 		setFact(fact)
	// 	})
	// }, [])
	// Si no tiene los corchetes para los argumentos por defecto se ejecuta cada que se renderiza el componente. Si no se estaria renderizando a cada rato ya que se cambia el estado con el setfact y eso provoca que se vuelva a renderizar
	// Usar el async / await en el el UseEffect. En teoria no funciona (?)
	// El efecto tiene que ser siempre una funcion sincrona, se tendria que envolver 

	useEffect(() => {
		//getRandomFact().then(setFact)
		getRandomFact().then(newFact => setFact(newFact))
	},[])
		

	// Recuperar la iamgen cada vez que tenemos una cita nueva
	useEffect(() => {
		if(!fact) return

		// const firstWord = fact.split(' ')[0]
		const threeFirstWord = fact.split(' ', 3).join(' ')
		// const firstWord = fact.split(' ').slice(0, 3).join(' ')
		// buscar info: mdn separar string por separador
		console.log(threeFirstWord)

		fetch(`https://cataas.com/cat/says/${threeFirstWord}?fontSize=50&fontColor=red&json=true`)
		.then(res => res.json())
		.then(response => {
			console.log('aqui estamos')
			const {url} = response
			setImageUrl(url)
		}) 
	},[fact])

	const handleClick = async () => {
		const newFact = await getRandomFact()
		setFact(newFact)
	}

return (
	<main>
		<h1>App de gaticos</h1>
		<button onClick={handleClick}>Update Data</button>

		<section>
			{fact && <p>{fact}</p>}
			{imageUrl && <img src={`${imageUrl}`} alt={`Image extracted using: ${fact}`}></img>}
		</section>
		
	</main>
)
}