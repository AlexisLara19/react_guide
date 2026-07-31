import { EVENTS } from "../utils/const";
import { useState, useEffect } from "react";

export function Router ({ routes = [], defaultComponent: DefaultComponent = () => <h1> Error 404</h1>}) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
  
  useEffect(()=>{
    // Por que debemos de declarar una funcion para manejar este set ????
    // Se tiene setCurrentPath guardado en una constante ya que cuando sea llamada para suscribirse y desuscribirse la referencia siempre sea la misma
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    // Nos suscribimos a los eventos de los botones de adelante y atras del navegador
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange) // Ir hacia una URL
    window.addEventListener(EVENTS.POPSTATE, onLocationChange) // Ir hacia atras en el navegador

    return () => {
      // Limpiamos la lista de eventos 
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  // Routes contiene  el componente a renderizar
  // Buscamos en la lista routes el elemento cuyo path coincida con current path 
  const Page = routes.find(({path}) => path === currentPath)?.Component
  
  //Devolvemos el componente encontrado y si no se encuentra devolvemos el componente que establecimos como default (error 404)
  return Page ? <Page></Page> : <DefaultComponent></DefaultComponent> 
}