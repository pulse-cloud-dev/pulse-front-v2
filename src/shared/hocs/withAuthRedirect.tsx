import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../lib/hooks";

export const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { isLogin } = useUser();
    if (!isLogin) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};
