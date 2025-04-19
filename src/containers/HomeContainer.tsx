import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchHomePageRequest } from "../store/reducers/pageSlice";
import Home from "../pages/Home";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const { home, isLoading, error } = useSelector(
    (state: RootState) => state.page
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchHomePageRequest());
  }, [dispatch]);

  return (
    <Home
      pageContent={home}
      isLoading={isLoading}
      error={error}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default HomeContainer;
