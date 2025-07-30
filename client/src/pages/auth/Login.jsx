// import { useState } from "react"; 
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from "../../features/auth/authSlice";
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { FiEye, FiEyeOff } from 'react-icons/fi';

// const Login = () => {
//   const dispatch = useDispatch();
//   const { error } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);

//   const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await dispatch(loginUser(formData));
//     if (res.meta.requestStatus === 'fulfilled') {
//       if (res.payload.role === 'admin') {
//         navigate('/dashboard/admin/overview');
//       } else if (res.payload.role === 'carOwner') {
//         navigate('/dashboard/owner/overview');
//       } else {
//         navigate(redirectPath);
//       }
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-600">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//           className="w-full p-2 border"
//         />

//         <div className="relative">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded pr-10"
//           />
//           <span
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//           </span>
//         </div>

//         <button className="w-full bg-blue-600 text-white p-2">Login</button>
//       </form>

//       <p className="text-center mt-4 text-sm">
//         Don’t have an account?{" "}
//         <Link to="/register" className="text-blue-600 hover:underline">
//           Sign up
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RenderInput } from "../../components/FormElement";

const Login = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(formData));
    if (res.meta.requestStatus === "fulfilled") {
      if (res.payload.role === "admin") {
        navigate("/dashboard/admin/overview");
      } else if (res.payload.role === "carOwner") {
        navigate("/dashboard/owner/overview");
      } else {
        navigate(redirectPath);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8  bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <RenderInput
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
          />

          <div className="relative">
            <RenderInput
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              label="Password"
            />
            <span
              className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
