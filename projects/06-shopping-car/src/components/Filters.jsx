import { useState, useId } from "react"
import { useFilters } from "../hooks/useFilters"

export function Filters() {
    const {filters, setFilters } = useFilters()
    //const [ minPrice, setMinPrice ] = useState(0)

    // Nuevo Hook useId -- INVESTIGAR
    const minPrinceFilteredId = useId()
    const categoryFilteredId = useId()

    const handleChangeMiPrice = (event) => {
        //setMinPrice(event.target.value)
        // Este onChange es el setState de filters en App.jsx, dos niveles hacia arriba
        // No se debe de hacer
        setFilters (prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        // Este onChange es el setState de filters en App.jsx, dos niveles hacia arriba
        // No se debe de hacer
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
        //console.log(event.target.value)
    }


    return(
    <>
    <section className = 'filters'>
        <div>
            <label htmlFor={minPrinceFilteredId} > Precio </label>
            <input 
            type="range"
            id={minPrinceFilteredId}
            min='0'
            max='1000'
            onChange={handleChangeMiPrice}
            value={filters.minPrice}
            ></input>
            <span>${filters.minPrice}</span>
        </div>

        <div>
            <label htmlFor={categoryFilteredId}> Categoria</label>
            <select id={categoryFilteredId} onChange={handleChangeCategory}>
                <option value='all'> Todas</option>
                <option value='groceries'> Comida</option>
                <option value='fragrances'> Perfumes</option>
            </select>
        </div>
    </section>
    
    </>
    )
}