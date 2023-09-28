import { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorPage from './ErrorPage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, eventId: null };
    this.clearState = this.clearState.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  clearState() {
    this.setState({ error: null, errorInfo: null, eventId: null });
  }

  render() {
    if (this.state.error) {
      return <ErrorPage clearState={this.clearState} />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any
};

export default ErrorBoundary;
