import React from "react";

import { Navigate, Outlet } from "react-router";
import useStateContext from "../hooks/useStateContext";
const Authenticate = () => {
  const { context } = useStateContext();
  return context.participantId == 0 ? <Navigate to="/" /> : <Outlet />;
};

export default Authenticate;
