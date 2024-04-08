import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/userAuthSlice';
import { useNavigate,Link } from 'react-router-dom';

const LoginUser = () => {
 const dispatch = useDispatch();
 const authStatus = useSelector(state => state.userAuth.authStatus);
 const [formData, setFormData] = useState({
    email: '',
    password: ''
 });

 const { email, password } = formData;

 const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

 const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
 };

 const validatePassword = (password) => {
    return password.length >= 8;
 };

 const handleSubmit = e => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
    } else if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long');
    } else {
      dispatch(loginUser({ email, password }));
        setFormData({
            email: '',
            password: ''
        });
    }
 };

 return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login user</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-gray-300 rounded-md px-3 py-2 mb-2"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            disabled={authStatus === 'loading'}
          >
            Login
          </button>
        </form>
        <div className="mt-4">
            <Link to="/" className="text-blue-500">Register</Link>
          </div>
          <div>
            <Link to="/adminLogin" className="text-blue-500">Admin Login</Link>
          </div>
      </div>
    </div>
 );
};

export default LoginUser;
