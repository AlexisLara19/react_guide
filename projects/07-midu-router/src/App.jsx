import { useState, useEffect, Component } from 'react'
import './App.css'

import { EVENTS } from './utils/const.js'
import { HomePage } from './pages/Home.jsx'
import { AboutPage } from './pages/About.jsx'
import { Router } from './components/Router.jsx'
import { Page404 } from './pages/Error.jsx'

const routes = [
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/about',
    Component: AboutPage
  }
]


function App() {
  

  return (
    <>
      {/* <main>
        {currentPath === '/' && <HomePage />}
        {currentPath === '/about' && <AboutPage />}
      </main> */}
      
      <main>
        <Router routes={routes} defaultComponent={Page404}></Router>
      </main>
    </>
  )
}

export default App
