import './App.css';
import { Home, SearchPage } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<SearchPage />} />
    </Routes>
    </>
  )
}

export default App
