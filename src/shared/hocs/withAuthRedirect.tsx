import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../lib/hooks";

export const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { isLogin } = useUser();
    console.log(isLogin, "확인");
    if (!isLogin) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};
