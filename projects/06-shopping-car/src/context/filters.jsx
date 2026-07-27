import { createContext, useState } from "react";

// 1- Creamos el contexto (ahora hay que crear el provider para proveer el contexto)
// Este es el que tenemos que consumir
export const FilterContext = createContext() 

// 2- Crear el provider, para proveer el contexto
// Este nos provee de accceso al contexto
export function FiltersProvider ({children}) {
    const [filters, setFilters] = useState ({
        category: 'all',
        minPrice: 500
    })

    return (
        <FilterContext.Provider value = {{
            filters,
            setFilters
        }}>
            {children}
        </FilterContext.Provider>
    )
}