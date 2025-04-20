import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { fetchSignupPageRequest } from "../store/reducers/pageSlice";
import { signupRequest } from "../store/reducers/authSlice";
import Signup from "../pages/Signup";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    signup: pageContent,
    isLoading: pageLoading,
    error: pageError,
  } = useSelector((state: RootState) => state.page);
  const {
    isLoading: authLoading,
    error: authError,
    isAuthenticated,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchSignupPageRequest());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async (formData: Record<string, any>) => {
    dispatch(signupRequest(formData));
  };

  return (
    <Signup
      pageContent={pageContent}
      isLoading={pageLoading || authLoading}
      error={pageError || authError}
      onSubmit={handleSignup}
    />
  );
};

export default SignupContainer;
