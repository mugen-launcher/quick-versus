import React from "react";
import FatalError from "./fatalError.view";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    const { children } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <FatalError>
          <h1>FATAL ERROR</h1>
          <p>{error.message}</p>
        </FatalError>
      );
    }

    return children;
  }
}
