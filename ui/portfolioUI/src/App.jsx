import { Route, Routes, Link, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Projects from './pages/projects/Projects'
import Project from './pages/projects/project/Project'
import Project404 from './pages/projects/Project404'
import Contact from './pages/contact/Contact'
import ContactSuccess from './pages/contact/success/ContactSuccess'
import Blog from './pages/blog/Blog'
import Blog404 from './pages/blog/Blog404'
import Post from './pages/blog/post/Post'
import NoPage from './pages/NoPage'

function App() {

  return (
    <>
      <nav>
        <span id='website-title'>IAN BENTLEY</span>
        <div id='links'>
          <Link to='/home'>About Me</Link>
          <Link to='/projects'>Projects</Link>
          <Link to='/blog'>Blog</Link>
          <Link to='/contact'>Contact Me</Link>
        </div>
      </nav>

      <Routes>
        <Route index element={<Navigate to="/home"/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/projects'>
          <Route index element={<Projects/>} />
          <Route path='project/:id' element={<Project/>}/>
          <Route path='404' element={<Project404/>}/>
        </Route>
        <Route path='/contact'>
          <Route index element={<Contact/>}/>
          <Route path='success' element={<ContactSuccess/>}/>
        </Route>
        <Route path='/blog'>
          <Route index element={<Blog/>}/>
          <Route path='posts/:slug' element={<Post/>}/>
          <Route path='404' element={<Blog404/>}/>
        </Route>
        <Route path='*' element={<NoPage/>}/>
      </Routes>
    </>
  )
}

export default App
