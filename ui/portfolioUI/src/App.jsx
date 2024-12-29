import { Route, Routes, Link, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Projects from './pages/projects/Projects'
import Project from './pages/projects/project/Project'
import Project404 from './pages/projects/Project404'
import Contact from './pages/contact/Contact'
import ContactSuccess from './pages/contact/success/ContactSuccess'
import Blog from './pages/blog/Blog'
import Blog404 from './pages/blog/Blog404'
import SubscribeSuccess from './pages/blog/SubscribeSuccess'
import SubscribeValidation from './pages/blog/SubscribeValidation'
import Post from './pages/blog/post/Post'
import NoPage from './pages/NoPage'

function App() {

  return (
    <>
      <nav className='flex justify-between flex-col px-4 pb-4 sm:flex-row'>
        <span id='website-title' className='font-bold text-xl pb-4'>IAN BENTLEY</span>
        <div id='links' className='flex justify-center w-full sm:w-96 sm:justify-end'>
          <Link to='/home' className='px-4'>About</Link>
          <Link to='/projects' className='px-4'>Projects</Link>
          <Link to='/blog' className='px-4'>Blog</Link>
          <Link to='/contact'className='px-4'>Contact</Link>
        </div>
      </nav>

      <Routes>
        <Route index element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/projects'>
          <Route index element={<Projects/>} />
          <Route path='project/:slug' element={<Project/>}/>
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
          <Route path='subscribe'>
            <Route index element={<Navigate to='/404'/>}/>
            <Route path='success' element={<SubscribeSuccess/>}/>
            <Route path='validation' element={<SubscribeValidation/>}/>
          </Route>
        </Route>
        <Route path='*' element={<Navigate to='/404'/>}/>
        <Route path='/404' element={<NoPage/>}/>
      </Routes>
    </>
  )
}

export default App
