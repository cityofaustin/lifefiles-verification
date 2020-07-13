import React, { Component, Children, createRef } from "react";
import * as PropTypes from "prop-types";
import Tab from "./Tab";
import "./Tabset.scss";
import "../../util/delay";
import delay from "../../util/delay";

class Tabset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevTabKey: this.props.defaultActiveKey
        ? this.props.defaultActiveKey
        : this.props.children[0].props.eventKey,
      tabKey: this.props.defaultActiveKey
        ? this.props.defaultActiveKey
        : this.props.children[0].props.eventKey,
      tabRef: createRef(),
    };
  }

  handleTabChange = async (eventKey) => {
    const { tabRef } = { ...this.state };
    this.setState({ tabKey: eventKey });
    tabRef.current.style.transition = "opacity 300ms ease 0s";
    tabRef.current.style.opacity = "0";
    await delay(300);
    this.setState({ prevTabKey: eventKey });
    tabRef.current.style.opacity = "1";
    // opacity: 1;
    // transition: opacity 300ms ease 0s;
  };

  renderTabs(children) {
    const { tabKey } = { ...this.state };
    return Children.map(children, (child) => {
      const { eventKey } = { ...child.props };
      return (
        <div
          className={`tab-item ${tabKey === eventKey ? "active" : ""}`}
          onClick={() => this.handleTabChange(eventKey)}
        >
          {child.props.title}
        </div>
      );
    });
  }

  renderTabContent(children) {
    const { prevTabKey, tabRef } = { ...this.state };
    const node = Children.toArray(children).filter((child) => {
      const { eventKey } = { ...child.props };
      return prevTabKey === eventKey;
    });
    return <div ref={tabRef}>{node}</div>;
  }

  render() {
    const { children, tabType } = { ...this.props };
    return (
      <div>
        <div className={`tabs`}>
          {this.renderTabs(children)}
        </div>
        <div>{this.renderTabContent(children)}</div>
      </div>
    );
  }
}

Tabset.propTypes = {
  defaultActiveKey: PropTypes.string,
  children: (props, propName, componentName) => {
    const prop = props[propName];
    let error = null;
    Children.forEach(prop, (child) => {
      if (child.type !== Tab) {
        error = new Error(
          "`" + componentName + "` children should be of type `Tab`."
        );
      }
    });
    return error;
  },
  tabType: PropTypes.oneOf(["success", "warning"]),
};

export default Tabset;
