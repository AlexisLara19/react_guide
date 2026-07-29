import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'



// Por que ya no aparece el ReactDOM antes del createRoot.?????

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
     <App />
   </StrictMode>,
)

// const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(
//   <App />
// )
