import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from "./components/Navbar"
import Login from './pages/Login'
import './App.scss'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar links={[{path: '/about', name: 'About'}, {path: './login', name: 'Login'}]} />
        <div className='pages'>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
