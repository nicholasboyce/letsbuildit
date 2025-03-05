import './App.css';
import { NavBar } from './components';
import { Home, SearchPage, Feed, FullPost, UserRepos, ErrorPage } from './pages';
import { Route, Routes, Outlet } from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/*' element={<NavBar />}>
        <Route path='posts'>
          <Route index element={<Feed/>} />
          <Route path='me' element={<p>My page!</p>}/>
          <Route path=':id' element={<p>Someone else's page!</p>} />
          <Route path=':id/:post' element={<p>The specific post of someone else!</p>} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
    </>
  )
}

export default App;