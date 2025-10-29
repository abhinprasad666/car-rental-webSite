import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../../utils/toastUtils';
import Loader from '../../../common/loaders/Loader';

import AdminLoginForm from './AdminLoginForm';
import AdminLoginLeftPanel from './AdminLoginLeftPanel';
import { clearAuthStateMessage } from '../../../redux/slices/authSlice/admin/adminLoginSlice';


const AdminLogin = () => {
     const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAdminLogin, loginMessage, loading, user } = useSelector(
    (state) => state.authAdmin
  );

  useEffect(() => {
    
     if(isAdminLogin){
      navigate("/")
     }
    if (loginMessage && isAdminLogin && user.role === "admin") {
      dispatch(clearAuthStateMessage());
      showToast("Admin Login successful!", "success");
      navigate("/welcome");
    }
  }, [isAdminLogin, navigate, loginMessage, dispatch, user]);

  useEffect(() => {
    if (error) {
      // Auto clear error after 5 seconds
      const timer = setTimeout(() => {
        dispatch(clearAuthStateMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);
 return (
  <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200">
    {loading ? (
      <Loader />
    ) : (
      <>
        <AdminLoginLeftPanel />
        <AdminLoginForm/>
      </>
    )}
  </div>
);
}

export default AdminLogin
