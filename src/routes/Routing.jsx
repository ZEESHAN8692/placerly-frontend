import React from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Blog from '../pages/Blog'
import SingleBlog from '../pages/SingleBlag'
import Signup from '../pages/signup'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import ContactUs from '../pages/ContactUs'

const Routing = () => {
  return (
   <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:id' element={<SingleBlog />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
        </Routes>
   </BrowserRouter>
  )
}

export default Routing