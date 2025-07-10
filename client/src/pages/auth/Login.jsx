import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';

import { FiEye, FiEyeOff } from 'react-icons/fi';


const Login = () => {
  const dispatch = useDispatch();
  const {  error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(formData));
    if (res.meta.requestStatus === 'fulfilled') {
      if (res.payload.role === 'admin'){
       navigate('/dashboard/admin');
      } else if (res.payload.role === 'carOwner') {
        navigate('/dashboard/owner');
      }
      else {
        navigate('/dashboard/user');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border" />
       <div className="relative">
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    placeholder="Password"
    onChange={handleChange}
    required
    className="w-full p-2 border rounded pr-10"
  />
  <span
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
  </span>
</div>
        <button className="w-full bg-blue-600 text-white p-2">Login</button>
      </form>
    </div>
  );
};

export default Login