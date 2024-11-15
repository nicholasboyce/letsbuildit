import './App.css';
import { Home, SearchPage, Feed } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/feed' element={<Feed />} />
    </Routes>
    </>
  )
}

export default App;
