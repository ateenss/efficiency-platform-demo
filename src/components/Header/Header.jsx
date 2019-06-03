import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import HeaderLinks from "./HeaderLinks.jsx";

import headerStyle from "../../assets/jss/material-dashboard-react/components/headerStyle.jsx";
import {Link} from "react-router-dom";

function Header({ ...props }) {
  function makeBrand() {
    let name;
    props.routes.map((prop, key) => {
      if (prop.path === props.location.pathname) {
        // 这里匹配到的一定是符合完全范式的route，然后需要对path解析，根据/来拆分
        let idx = prop.path.lastIndexOf("/");
        if(idx === 0){
          name = <div className={classes.flex}><Link color="transparent" to={prop.path} className={classes.title} style={{fontWeight:"400"}}>{prop.navbarName}</Link></div>
        }else{

          let target = prop.path.substring(0, idx);
          let n = props.routes.map((p,k) =>{

            if(p.path === target){
              return p.navbarName;
            }

          });


          name = <div className={classes.flex}><Link color="transparent" to={prop.path.substring(0, idx)} className={classes.title}>{n}</Link>  /  <Link color="transparent" to={prop.path} className={classes.title} style={{fontWeight:"400"}}>{prop.navbarName}</Link></div>
        }

      }
      return null;
    });
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses} >
      <Toolbar className={classes.container}>

          {makeBrand()}
        <Hidden mdDown  implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden lgUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
