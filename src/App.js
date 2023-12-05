import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Navbar, Container  } from 'react-bootstrap'
import Main from './Main';
import Summoner from './Summoner';
import Ingame from './Ingame';
import Champions from './Champions';

function App() {

  return (
    <div className="App">

      <Navbar expand="lg" className="bar">  
        <Container>
          <Navbar.Brand className='logo' href="/" >
            <img alt='logo' src='https://s-lol-web.op.gg/images/icon/opgglogo.svg?v=1700641403304' width='100%'/>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/summoner/:region/:name' element={<Summoner/>} />
        <Route path='/summoner/:region/:name/champions' element={<Champions/>} />
        <Route path='/summoner/:region/:name/ingame' element={<Ingame/>} />
      </Routes>
    </div>
  );
}

export default App;
