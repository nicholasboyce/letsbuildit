import { Suspense } from 'react';
import './App.css';
import { Home, SearchPage, Feed, FullPost, UserRepos } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/posts/:id' element={<FullPost />} />
      <Route path='/users/:name/repos' element={
        <Suspense fallback={<h1>Loading...</h1>}>
          <UserRepos />
        </Suspense>
        } />
    </Routes>
    </>
  )
}

export default App;
