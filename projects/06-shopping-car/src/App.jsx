import { Products } from "./components/Products"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { products as initialProducts} from './mocks/products.json'
import { useFilters } from "./hooks/useFilters"
import { useState } from "react"





function App() {

  // El contexto (en este caso el estado de los filtros) pone a disposicion de todos los que se encuentran envueltos en ese contexto la informacion del estado sin tener que pasarlo a los childrens como props
  // Desacoplar estados del arbol de componentes
  // Por tanto tenemos que crear el contexto, proveer el contexto y consumir el contexto
  // El contexto es una forma de inyeccion de dependencias 
  // Algo que cambia pocas veces (como inicios de sesion)
  // Si no algo como redux o sustance (mejor)


  //const [products] = useState(initialProducts)
  const {filterProducts} = useFilters()
  const filteredProducts = filterProducts(initialProducts)

  return (
    <>
    <Header> </Header>
    <Products products={filteredProducts}></Products>
    <Footer></Footer>
    </>
  )
}

export default App
