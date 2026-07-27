import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isFollowing: false
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    isFollowing: true
  },
  {
    userName: 'TMChein',
    name: 'Tomas',
    isFollowing: false
  }
]


// Rest operator-> ...
// Se utiliza para pasar props a los componentes
// const midudev = {isFollowing: true, userName: 'midudev'}
// <TwitterFollowCard {...midudev}>
// Pasa cada una de las propiedades de este objeto como si fuera una prop en el componente
// Normalmente no se utiliza: a veces se re renderiza sin necesidad


export function App () {
  return (
    <section className='App'>
      {

        // users.map(user=> {
        //   const {userName, name, isFollowing} = user
        //   return (
        //     <TwitterFollowCard
        //     userName={userName}
        //     initialIsFollowing={isFollowing}
        //     >
        //       {name}
        //     </TwitterFollowCard>
        //   )
        // })

        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {/* Lo que el elemento esta envolviendo se llama children */}
            {name} 
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}

