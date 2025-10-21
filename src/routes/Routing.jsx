import React from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Blog from '../pages/Blog'
import SingleBlog from '../pages/SingleBlag'
import Signup from '../pages/signup'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import ContactUs from '../pages/ContactUs'
import Executors from '../pages/Executors'
import Pricing from '../pages/Pricing'
import Checkout from '../pages/Checkout'
import Dashboard from '../pages/Dashboard'
import Debts from '../pages/Debts'
import Insurance from '../pages/Insurance'
import Utilities from '../pages/Utilities'
import Test from '../pages/test'
import FAQ from '../pages/FAQ'
import AssetsPage from '../pages/Assets'

const Routing = () => {
  return (
   <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/blogs' element={<Blog />} />
            <Route path='/blog/:id' element={<SingleBlog />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
            <Route path='/pricing' element={<Pricing/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/faq' element={<FAQ/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/dashboard/executors' element={<Executors/>}/>
            <Route path='/dashboard/debts' element={<Debts/>}/>
            <Route path='/dashboard/insurance' element={<Insurance/>}/>
            <Route path='/dashboard/utilities' element={<Utilities/>}/>
            <Route path='/dashboard/assets' element={<AssetsPage/>}/>
            <Route path='/dashboard/test' element={<Test/>}/>
        </Routes>
   </BrowserRouter>
  )
}

export default Routing