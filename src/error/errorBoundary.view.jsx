const React = require("react");

module.exports = class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <article class="fatal-error">
          <h1>FATAL ERROR</h1>
          <p>{error.message}</p>
        </article>
      );
    }

    return this.props.children;
  }
}
