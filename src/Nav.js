import React, { Component, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  SpsNavBar,
  SpsNavBarItem,
  SpsNavBarItems
} from "@spscommerce/ui-react";

class SpsNavLinkWithoutRouter extends Component {
  render() {
    const {
      children,
      to,
      match,
      location,
      navLinkStyle,
      navLinkActiveStyle,
      staticContext,
      ...props
    } = this.props;
    return (
      <NavLink
        to={to}
        style={{ ...navLinkStyle }}
        activeStyle={{ ...navLinkActiveStyle }}
        {...props}
      >
        <SpsNavBarItem active={location.pathname.indexOf(to) === 0}>
          {children}
        </SpsNavBarItem>
      </NavLink>
    );
  }
}

const SpsNavLink = withRouter(SpsNavLinkWithoutRouter);

export default class Nav extends Component {
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <SpsNavBar
          appLogo="https://cdn.dev.spsc.io/web/framework/assets/18.01.01/icons/color-lines/color-lines.svg"
          appName="SPS APP"
          appUrl="/home"
          items={({
            NavBarItems,
            NavBarItem,
            navLinkStyle,
            navLinkActiveStyle
          }) => {
            return (
              <SpsNavBarItems>
                <SpsNavLink navLinkStyle={navLinkStyle} to="/home">
                  Home
                </SpsNavLink>
              </SpsNavBarItems>
            );
          }}
        />
        {children}
      </Fragment>
    );
  }
}
