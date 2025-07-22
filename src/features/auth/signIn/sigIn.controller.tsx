import toast from "react-hot-toast";
import { useEffect } from "react";

import { signInService } from "./signIn.service";
import { SignInView } from "./signIn.view";
import { SignInRequestDTO } from "@/contracts";
import { usePageNavigation, useUser } from "@/shared/lib/hooks";

//  email: "ㅕㄴㄷ@test.com", password: "Password123!"
export const SigInController = () => {
  const { goHome } = usePageNavigation();
  const { login } = useUser();
  const { mutation, requestSignIn } = signInService.useSignIn();
  const handleSubmit = (formData: SignInRequestDTO) => requestSignIn(formData);

  useEffect(() => {
    if (mutation.isSuccess) {
      if (mutation.data.body.access_token) {
        login(mutation.data.body.access_token);
        goHome();
      }
      toast.success(mutation.data.message);
    } else if (mutation.isError) {
      alert((mutation.error as any).data.message);
    }
  }, [mutation.isSuccess, mutation.isError]);

  const props = {
    event: { handleSubmit },
  };
  return <SignInView {...props} />;
};
