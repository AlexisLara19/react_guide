import { useState } from "react"

export function Filters({onChange}) {
    const [minPrice, setMinPrice] = useState(0)
    
    const handleChangeMiPrice = (event) => {
        setMinPrice(event.target.value)
        // Este onChange es el setState de filters en App.jsx, dos niveles hacia arriba
        // No se debe de hacer
        onChange (prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        // Este onChange es el setState de filters en App.jsx, dos niveles hacia arriba
        // No se debe de hacer
        onChange(prevState => ({
            ...prevState,
            category: event.target.value
        }))
        //console.log(event.target.value)
    }


    return(
    <>
    <section className = 'filters'>
        <div>
            <label htmlFor="price" > Precio </label>
            <input 
            type="range"
            id="price"
            min='0'
            max='1000'
            onChange={handleChangeMiPrice}
            ></input>
            <span>${minPrice}</span>
        </div>

        <div>
            <label htmlFor="category"> Categoria</label>
            <select id="category" onChange={handleChangeCategory}>
                <option value='all'> Todas</option>
                <option value='groceries'> Comida</option>
                <option value='fragrances'> Perfumes</option>
            </select>
        </div>
    </section>
    
    </>
    )
}