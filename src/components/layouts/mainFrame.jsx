/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'react-quill/dist/quill.snow.css';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

import routesChildren from "../../routes/routesChildren.jsx";

import dashboardStyle from "../../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import logo from "../../assets/img/reactlogo.png";
import Reminder from "../common/Reminder"

const switchRoutes = (
  <Switch>
    {routesChildren.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);




class App extends React.Component {
  constructor(props) {
    super(props);
    // store.dispatch(getInitial());
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routesChildren}
          logoText={"效率平台"}
          logo={logo}
          color="grey"
          // image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          width
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={routesChildren}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          { (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) }
        </div>
        <Reminder/>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
