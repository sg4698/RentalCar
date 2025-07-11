// src/hooks/useLogout.js
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { showToast } from "../utils/toast";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // If you're using createAsyncThunk
      showToast("Logged out successfully!");
      navigate("/");
    } catch (error) {
      showToast("Logout failed. Please try again.",error);
    }
  };

  return handleLogout;
};

export default useLogout;
