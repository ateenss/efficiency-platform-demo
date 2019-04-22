import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components
import Button from "../../components/CustomButtons/Button.jsx";

import history from '../../history/history';

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LogoutIcon from "@material-ui/icons/WorkOff";
import ChangePasswordIcon from "@material-ui/icons/Lock";

import ListItemText from "@material-ui/core/ListItemText";
import ChangePassword from "./ChangePassword";
import {showChangePassword} from "../../actions/CommonAction";

const styles = theme => ({
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},
});


class HeaderLinks extends React.Component {

    state = {
        open: false,
        anchorEl: null,

    };
    handleToggle = () => {
        this.setState(state => ({open: !state.open}));
    };

    handleMenuClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleLogout = () => {

        this.handleMenuClose();

        localStorage.removeItem("token");

        history.push('/login');

    };

    handleMenuClose = () => {

        this.setState({anchorEl: null});
    };

    handleChangePassword = () => {

        showChangePassword();

        this.handleMenuClose();
    };

    render() {
        const {classes} = this.props;
        const {open, anchorEl} = this.state;
        return (
            <div>
                <Button
                    color={window.innerWidth > 1199 ? "transparent" : "white"}
                    justIcon={window.innerWidth > 1199}
                    simple={!(window.innerWidth > 1199)}
                    aria-label="Person"
                    className={classes.buttonLink}
                    onClick={this.handleMenuClick}
                >
                    <Person className={classes.icons}/>
                    <Hidden mdUp implementation="css">
                        <p className={classes.linkText}>Profile</p>
                    </Hidden>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem onClick={this.handleChangePassword}>

                        <ListItemIcon className={classes.icon}>
                            <ChangePasswordIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="修改密码" />


                    </MenuItem>
                    <MenuItem onClick={this.handleLogout}>

                        <ListItemIcon className={classes.icon}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="登出" />

                    </MenuItem>
                </Menu>
                <ChangePassword/>
            </div>
        );
    }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
