import React from "react";

class ErrorBoundary extends React.Component<{}, {hasError: boolean, error: any}>{
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: any) {
    return {hasError: true}
  }

  componentDidCatch(error: { toString: () => any; }, errorInfo: any) {
    this.setState({error: error.toString()});
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return(
        <div className="vertically-center">
          <h1>{`Something went wrong - Reason -> ${this.state.error}`}</h1>
          <h2>Please mail this to support with above error reason.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary