import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

import Dashboard from './pages/Dashboard';

import Lixeiras from './pages/Lixeiras';

import Caminhoes from './pages/Caminhoes';

import Coletas from './pages/Coletas';

import Alertas from './pages/Alertas';

import Usuarios from './pages/Usuarios';

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Login />} />

        <Route path='/dashboard' element={<Dashboard />} />

        <Route path='/lixeiras' element={<Lixeiras />} />

        <Route path='/caminhoes' element={<Caminhoes />} />

        <Route path='/coletas' element={<Coletas />} />

        <Route path='/alertas' element={<Alertas />} />

        <Route path='/usuarios' element={<Usuarios />} />
        
      </Routes>

    </BrowserRouter>
  )
}

export default App;