import { EVENTS, BUTTONS } from "../utils/const"

function navigate (href) {
    window.history.pushState({}, '', href)
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
}

export function Link ({target, to, ...props}) {
    
    const handleClick = (event) => {
        
        // Filtrando eventos por medio de combinacion de botones
        const isMainEvent = event.button === BUTTONS.primary // 0 Click
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'
        
        if (isMainEvent && isManageableEvent && !isModifiedEvent){
             event.preventDefault() // Evitamos que recarge la pagina completa
            navigate(to)
        }
        
    }

    return <a onClick={handleClick} href={to} target={target} {...props}></a>
}