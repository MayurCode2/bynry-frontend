// UserListingPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../slices/userSlice';
import UserCard from '../../components/UserCard';
import defaltImg from '../../assets/bussiness.png'
import { Link,useNavigate } from 'react-router-dom';

const UserListingPage = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Optionally, redirect the user to the login page or update the application state
 };
  
 const profile=()=>{
navigate('/userProfile')
 }
  console.log(userList)
  console.log(user.name)

  

  return (
    <div className="container mx-auto">
      <div>
      <header className="bg-blue-500 text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">User Dashboard</h1>
        <div className='flex' >
          <div onClick={profile}>
            <img className=' w-6 h-6' src={user.profilePicture || defaltImg } alt="img"/> 
          </div>
          <p className='px-2'> {user.name}</p> {/* Access the user's name directly */}
          <button className="bg-red-500 text-white px-4 rounded" onClick={handleLogout}>
            Logout
          </button>
         
        </div>
      </div>
    </header>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {userList && userList.map((user) => ( // Check if userList is truthy before mapping
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserListingPage;
