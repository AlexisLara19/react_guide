import { useState } from 'react' // Esto es una utilidad o hook-> Te permiten aniadir funcionalidad a los componentes de react, ejecutar codigo arbitrario


// Valores por defecto en props TwitterFollowCard ({ children, userName=unknown,
export function TwitterFollowCard ({ children, userName, initialIsFollowing }) {
  // Estado interno a nivel de componente
  // Desestructuracion ya que useState devuelve un array.
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  console.log('[TwitterFollowCard] render with userName: ', userName)

  // Ternaria condicional para el texto del boton
  const text = isFollowing ? 'Siguiendo' : 'Seguir'
  // Ternaria condicional para el estilo del boton
  const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img
          className='tw-followCard-avatar'
          alt='El avatar de midudev'
          src={`https://unavatar.io/${userName}`}
        />
        <div className='tw-followCard-info'>
          {/* Diferencia entre usar children o usar una prop???
            Children -> cuando es lo mas importante 
            Solo puede haber un children, pero ese children puede tener varios elementos
          */}
          <strong>{children}</strong>
          <span className='tw-followCard-infoUserName'>@{userName}</span>
        </div>
      </header>

      <aside>
        {/* Renderizado dinamico con el className */}
        <button className={buttonClassName} onClick={handleClick}>
          <span className='tw-followCard-text'>{text}</span>
          <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
        </button>
      </aside>
    </article>
  )
}

// Pasar funciones como props
// Pasar elementos como props
// Diferencia entre un componente(factoria de elementos, funcion que devuelve elemento) y un elemento (lo que se renderiza)
// Las props deben de ser inmutables, en su lugar se crean constantes dentro de la funcion
// Diferencia entre codigo imperativo y declarativo