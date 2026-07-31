import { Link } from "../components/Link"

export function HomePage () {
    return (
        <>
        <h1>Home</h1>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam porro, error deserunt maxime velit ... </p>
        {/* Elemento Ancore */}
        <Link to='/about'>Ir al about</Link>
        </>
    )
}