import { useEffect, useContext } from "react";

import { Context as AuthContext } from "../context/AuthContext";

const LoadingScreen = () => {
  const { checkLocalSigin } = useContext(AuthContext);

  useEffect(() => {
    checkLocalSigin();
  }, []);

  return null;
};

export default LoadingScreen;
