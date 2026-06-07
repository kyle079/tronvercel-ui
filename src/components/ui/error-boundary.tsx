import { Component, type ReactNode, type ErrorInfo } from 'react';
import { ErrorState } from './empty-state';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/** React error boundary — catches render errors and shows a fallback UI. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Error reporting hook — consumers can override via onError prop if needed.
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (error != null) {
      if (this.props.fallback) {
        return this.props.fallback(error, this.reset);
      }
      return (
        <ErrorState
          title="Render error"
          message={error.message}
          retry={this.reset}
        />
      );
    }
    return this.props.children;
  }
}
