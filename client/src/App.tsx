import { Suspense } from 'react';
import './App.css';
import { Home, SearchPage, Feed, FullPost, UserRepos } from './pages';
import { Route, Routes, Outlet } from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/*' element={<><h1>Octopod</h1><Outlet /></>}>
        <Route path='posts'>
          <Route index element={<Feed/>} />
          <Route path='me' element={<p>My page!</p>}/>
          <Route path=':name' element={<p>Someone else's page!</p>} />
          <Route path=':name/:post' element={<p>The specific post of someone else!</p>} />
        </Route>
        <Route path='*' element={<h1>Sorry! You're Lost...</h1>} />
      </Route>
    </Routes>
    </>
  )
}

export default App;

      {/* <Route path='/search' element={<SearchPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/posts/:id' element={<FullPost />} />
      <Route path='/users/:name/repos' element={<UserRepos />} /> */}
