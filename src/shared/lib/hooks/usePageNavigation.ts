import { useNavigate } from "react-router-dom";

export function usePageNavigation() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goToPage = (path: string) => {
    navigate(path);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const goWithState = (path: string, state: Record<string, any>) => {
    navigate(path, { state });
  };

  const goWithQuery = (path: string, queryParams: Record<string, any>) => {
    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`${path}?${queryString}`);
  };

  const goIfConditionMe = (path: string, condition: boolean) => {
    if (condition) {
      navigate(path);
    } else {
      alert("접근 권한이 없습니다.");
    }
  };

  return {
    goHome,
    goToPage,
    goBack,
    goForward,
    goWithState,
    goWithQuery,
    goIfConditionMe,
  };
}
