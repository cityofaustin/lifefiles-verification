import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  render() {
    const {children} = {...this.props};
    return children;
  }
}

Tab.propTypes = {
  eventKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Tab;
