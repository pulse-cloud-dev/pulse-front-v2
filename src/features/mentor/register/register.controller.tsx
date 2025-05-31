import { RegisterView } from "./register.view";

export const registerController = () => {
  const props = {
    count: 20,
  };
  return <RegisterView {...props} />;
};
