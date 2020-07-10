import React, { Component } from "react";
import "./Accordion.scss";
// import { ReactComponent as CheckboxAnimated } from "../../img/checkbox-animated.svg";
import { ReactComponent as ChevronRight } from "../../img/chevron-right.svg";
import * as PropTypes from "prop-types";

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: props.isExpanded ? true : false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.isExpanded !== this.props.isExpanded) {
      this.setState({isExpanded: this.props.isExpanded});
    }
  }

  expandCollapse = (e) => {
    const {setExpanded} = {...this.props};
    this.setState({ isExpanded: e.target.checked });
    if(setExpanded) {
      setExpanded(e.target.checked);
    }
  }

  render() {
    const { id, title, icon, labelType } = { ...this.props };
    const { isExpanded } = { ...this.state };
    return (
      <div className="accordion">
        <div>
          <input
            className="accordion-input"
            type="checkbox"
            id={id}
            checked={isExpanded}
            onChange={this.expandCollapse}
          />
          <label className={'accordion-label '+ (labelType === 'loading' ? 'loading' : '')} htmlFor={id}>
            <div className="left-header">
              {icon}
              <span>{title}</span>
            </div>
            <ChevronRight />
          </label>
          <div className="accordion-content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

Accordion.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,

  icon: PropTypes.node,
  isExpanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  labelType: PropTypes.string
};

export default Accordion;
