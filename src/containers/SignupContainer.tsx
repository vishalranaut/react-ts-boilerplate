import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchSignupPageRequest } from '../store/reducers/pageSlice';
import { signupRequest } from '../store/reducers/authSlice';
import Signup from '../pages/Signup';

const SignupContainer = () => {
  const dispatch = useDispatch();
  const { signup: pageContent, isLoading: pageLoading, error: pageError } = useSelector((state: RootState) => state.page);
  const { isLoading: authLoading, error: authError } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchSignupPageRequest());
  }, [dispatch]);

  const handleSignup = async (formData: Record<string, any>) => {
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Passwords do not match');
    }
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