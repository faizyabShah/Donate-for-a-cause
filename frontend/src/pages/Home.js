import './Home.scss'
import { useUserContext } from '../hooks/userContextHook'

function Home() {

  const { isLoggedIn, user } = useUserContext()

  return (
    <div className="container">
    
      <div className="info">
        <h1>Donate for a cause</h1>
      </div>
      <div className="cards"></div>
    
    </div>
  )
}

export default Home