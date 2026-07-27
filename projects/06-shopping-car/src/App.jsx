import { Products } from "./components/Products"
import { Header } from "./components/Header"
import { products as initialProducts} from './mocks/products.json'
import { useState } from "react"

function App() {
  const [products] = useState(initialProducts)
  // Filtros por categoria y por precio minimo
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 30
  })

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

  const filteredProducts = filterProducts(products)

  return (
    <>
    <Header changeFilters={setFilters}> </Header>
    <Products products={filteredProducts}></Products>
    </>
  )
}

export default App
