import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Navbar, Container  } from 'react-bootstrap'
import Main from './Main';
import Summoner from './Summoner';
import Ingame from './Ingame';
import Champions from './Champions';
import Login from './Login';
import LoginAuth from './LoginAuth';

function App() {

  return (
    <div className="App">

      <Navbar expand="lg" className="bar">  
        <Container>
          <Navbar.Brand className='logo-header' href="/" >
            <img alt='logo' src='https://s-lol-web.op.gg/images/icon/opgglogo.svg?v=1700641403304' width='100%'/>
          </Navbar.Brand>
         <button onClick={() => {window.location.href='/login'}} type='submit'>로그인</button>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/summoner/:region/:name' element={<Summoner/>} />
        <Route path='/summoner/:region/:name/champions' element={<Champions/>} />
        <Route path='/summoner/:region/:name/ingame' element={<Ingame/>} />
        <Route path='/auth' element={<LoginAuth/>}/>
      </Routes>
    </div>
  );
}

export default App;

