import { ReactNode, Suspense } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { SimplifiedUserlResponseDTO } from "@/contracts";
import { usePageNavigation } from "@/shared/lib/hooks";
import { userApis } from "@/networks";
interface StepThreeAuthProps {
  children: ReactNode;
}

// 실제 이메일 검증 API 호출

const StepThreeAuthContent = ({ children }: StepThreeAuthProps) => {
  const queryClient = useQueryClient();
  const { goToPage } = usePageNavigation();
  const cachedUser = queryClient.getQueryData(["auth", "sign-up", "userinfo"]) as SimplifiedUserlResponseDTO;

  if (cachedUser === null && undefined) {
    goToPage("/auth/signIn");
  }

  useSuspenseQuery({
    queryKey: ["auth", "verify-email"],
    queryFn: () => userApis.emailCheck(cachedUser.email),
  });

  return <>{children}</>;
};

const StepThreeAuth = ({ children }: StepThreeAuthProps) => {
  return (
    <Suspense fallback={<div>Verifying email...</div>}>
      <StepThreeAuthContent>{children}</StepThreeAuthContent>
    </Suspense>
  );
};

export default StepThreeAuth;
