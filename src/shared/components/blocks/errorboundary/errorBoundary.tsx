import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.log("---------------  getDerivedStateFromError   ---------------");
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("---------------  componentDidCatch   ---------------");
    console.log(error, errorInfo.componentStack);
  }

  render(): ReactNode {
    // hasError값이 true로 바뀌면 fallback를 렌더한다
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}


export default ErrorBoundary;

