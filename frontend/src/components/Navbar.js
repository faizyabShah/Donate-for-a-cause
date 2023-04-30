import { Link } from 'react-router-dom'
import './Navbar.scss'


const Navbar = function ( {links} ) {
    return (
    <header>
        <div className='container-navbar'>
            <Link to='/'>
                <h1>Home</h1>
            </Link>
            {
                links.map((link) => (
                    <Link to={link.path}>
                        <h3>{link.name}</h3>
                    </Link>
                ))
            }
        </div>
      </header>
    )
  }

export default Navbar