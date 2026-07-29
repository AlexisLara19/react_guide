import { useContext } from "react"
import { FilterContext } from "../context/filters"

export function useFilters (){
  // Filtros por categoria y por precio minimo
  // const [filters, setFilters] = useState({
  //   category: 'all',
  //   minPrice: 30
  // })

  // Aqui estamos consumiendo el contexto (estatico)
  // Se puede hacer un estado global pero no es el uso principal
  const {filters, setFilters} = useContext(FilterContext)
  console.log(filters)

  // PRACTICAR FILTROS
  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price > filters.minPrice && (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  return {filters, filterProducts, setFilters}
}