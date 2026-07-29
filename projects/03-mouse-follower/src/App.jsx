import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    console.log('Efecto')
    const handleMove = (event) => {
      const {clientX, clientY} = event
      console.log('handleMove', {clientX, clientY})
      setPosition({x: clientX, y: clientY})
    }
    if (enabled){
      window.addEventListener('pointermove', handleMove )
    }
    
    // Limpiar subscripciones, cuando el componente se desmonta
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled]) //Controlamos la subscribcion a los eventos

  return (
    <>
      <main>
        <div style={{
          position: 'absolute',
          backgroundColor: '#09F',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}>
        </div>
        <button onClick={() => setEnabled(!enabled)}> 
          {enabled ? 'Desactivar' : 'Activar'} seguir puntero 
        </button>
      </main>
    </>
  )
}

export default App
