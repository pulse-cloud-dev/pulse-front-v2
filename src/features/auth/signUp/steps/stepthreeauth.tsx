import { ReactNode, Suspense, Component, ErrorInfo } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { SimplifiedUserlResponseDTO } from "@/contracts";
import { usePageNavigation } from "@/shared/lib/hooks";
import { userApis } from "@/networks";
interface StepThreeAuthProps {
  children: ReactNode;
}

class AuthErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Auth verification error:", error, errorInfo);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return <div>Redirecting...</div>;
    }

    return this.props.children;
  }
}
// 실제 이메일 검증 API 호출

const StepThreeAuthContent = ({ children }: StepThreeAuthProps) => {
  const queryClient = useQueryClient();
  const { goToPage } = usePageNavigation();
  const cachedUser = queryClient.getQueryData(["auth", "sign-up", "userinfo"]) as SimplifiedUserlResponseDTO;
  console.log("check", cachedUser);
  if (cachedUser.email === null && undefined) {
    goToPage("/auth/signIn");
  }

  useSuspenseQuery({
    queryKey: ["auth", "verify-email"],
    queryFn: () => userApis.emailCheck(cachedUser.email),
  });

  return <>{children}</>;
};

const StepThreeAuth = ({ children }: StepThreeAuthProps) => {
  const { goToPage } = usePageNavigation();

  const handleError = () => {
    goToPage("/auth/signIn");
  };
  return (
    <AuthErrorBoundary onError={handleError}>
      <Suspense fallback={<div>Verifying email...</div>}>
        <StepThreeAuthContent>{children}</StepThreeAuthContent>
      </Suspense>
    </AuthErrorBoundary>
  );
};

export default StepThreeAuth;
