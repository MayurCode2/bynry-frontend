import React from 'react'
import Register from './pages/user/Register'
import LoginUser from './pages/user/LoginUser'
import AdminLogin from './pages/admin/AdminLogin'
import { Routes,Route } from 'react-router'
import UserListingPage from './pages/user/UserList'
import UserProfile from './pages/user/UserProfile'


function App() {
  return (
    <div>
<Routes>
  <Route path="/" element={<Register/>} />
  <Route path="/loginUser" element={<LoginUser/>} />
  <Route path="/adminLogin" element={<AdminLogin/>} />
  <Route path="/userLIst" element={<UserListingPage/>} />
  <Route path="/userProfile" element={<UserProfile/>} />
</Routes>
    </div>
  )
}

export default App