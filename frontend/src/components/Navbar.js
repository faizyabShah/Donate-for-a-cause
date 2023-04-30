import { Link } from 'react-router-dom'
import './Navbar.scss'


const Navbar = function ( {links} ) {
    return (
    <header>
        <div className='container'>
            <Link to='/'>
                <h1>Home</h1>
            </Link>
            <div className="spacer">
            {
                links.map((link) => (
                    <Link to={link.path}>
                        <h3>{link.name}</h3>
                    </Link>
                ))
            }
            </div>
        </div>
      </header>
    )
  }

export default Navbar