import './App.css';
import Home from './pages/Home/Home';
import SearchPage from './pages/Search/SearchPage';
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
