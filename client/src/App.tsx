import './App.css';
import { Home, SearchPage, Feed, FullPost } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/posts/:id' element={<FullPost />} />
    </Routes>
    </>
  )
}

export default App;
