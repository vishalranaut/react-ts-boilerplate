import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Profile from "../pages/Profile";
import { fetchUserProfileRequest } from "../store/reducers/authSlice";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfileRequest());
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  return (
    <Profile user={user ? { ...user, name: user.name || "Unknown" } : null} />
  );
};

export default ProfileContainer;
