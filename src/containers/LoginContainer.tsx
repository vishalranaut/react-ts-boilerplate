import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchLoginPageRequest } from '../store/reducers/pageSlice';
import { loginRequest } from '../store/reducers/authSlice';
import Login from '../pages/Login';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const { login: pageContent, isLoading: pageLoading, error: pageError } = useSelector((state: RootState) => state.page);
  const { isLoading: authLoading, error: authError } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchLoginPageRequest());
  }, [dispatch]);

  const handleLogin = async (formData: Record<string, any>) => {
    dispatch(loginRequest({ email: formData.email, password: formData.password }));
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