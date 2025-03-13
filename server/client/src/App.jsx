import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/layout'
import Login from './pages/users/login'
import Register from './pages/users/register'
import Home from './pages/users/home'
import Dashboard from './pages/users/dashboard'
import CreatePost from './pages/posts/createpost'
import UpdatePost from './pages/posts/updatepost'
import GuestRoutes from './routes/guestroutes'
import UserRoutes from './routes/userroutes'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>


                <Route path='dashboard' element={<Dashboard />} />
                <Route path='createpost' element={<CreatePost />} />
                <Route path='updatepost' element={<UpdatePost />} />


                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
