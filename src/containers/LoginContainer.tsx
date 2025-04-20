import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { fetchLoginPageRequest } from "../store/reducers/pageSlice";
import { loginRequest } from "../store/reducers/authSlice";
import Login from "../pages/Login";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    login: pageContent,
    isLoading: pageLoading,
    error: pageError,
  } = useSelector((state: RootState) => state.page);

  const {
    isLoading: authLoading,
    error: authError,
    isAuthenticated,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchLoginPageRequest());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (formData: { email: string; password: string }) => {
    dispatch(loginRequest(formData));
  };

  return (
    <Login
      pageContent={pageContent}
      isLoading={pageLoading || authLoading}
      error={pageError || authError}
      onSubmit={handleLogin}
    />
  );
};

export default LoginContainer;
