import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../slices/userAuthSlice';
import { useNavigate,Link } from 'react-router-dom';

const RegisterPage = () => {
 const dispatch = useDispatch();
 const authStatus = useSelector(state => state.userAuth.authStatus);
 const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
 });
const navigate = useNavigate();
 const { name, email, password, confirmPassword } = formData;

 const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

 const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
 };

 const validatePassword = (password) => {
    return password.length >= 8;
 };

 const handleSubmit =async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else if (!validateEmail(email)) {
      alert('Please enter a valid email address');
    } else if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long');
    } else {
      await dispatch(registerUser({ name, email, password }));
     

        navigate('/login');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
 };

 return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border-gray-300 rounded-md px-3 py-2 mb-2"
            required
          />
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
            className="w-full border-gray-300 rounded-md px-3 py-2 mb-2"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            disabled={authStatus === 'loading'}
          >
            Register
          </button>
        </form>
        <div className="mt-4">
          <Link to="/loginUser" className="text-blue-500">Already have an account? Login</Link>
          </div>
          <div>
            <Link to="/adminLogin" className="text-blue-500">Admin Login</Link>
          </div>
      </div>
    </div>
 );
};

export default RegisterPage;