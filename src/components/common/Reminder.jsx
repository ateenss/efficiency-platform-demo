import React from 'react';
// @material-ui/icons
//core components
import AddAlert from "@material-ui/icons/AddAlert";
//core components
import Snackbar from "@material-ui/core/Snackbar";
import {connect} from "react-redux";
import store from "../../stores";
import {SHOW_NOTIFICATION, CLOSE_NOTIFICATION} from "../../actions/types";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};
const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const {classes, className, message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});


class Reminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: ""
        };

    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     // console.log("1   " + JSON.stringify(nextProps));
    //     // console.log(JSON.stringify(this.props));
    //     // // if(nextProps.open){
    //     // //     return false;
    //     // // }
    //     // // return false;
    //     // return true;
    //     return true;
    // }

    // componentWillReceiveProps(nextProps, nextState) {
    //     this.setState({open: nextProps.open, message:nextProps.message});
    //
    // }

    handleClose = (event, reason) => {
        store.dispatch({
            type: CLOSE_NOTIFICATION
        })
    };

    componentDidUpdate() {
    }

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    autoHideDuration={3000}
                    open={this.props.open}
                    // onClose={this.handleClose}
                    onClose={this.handleClose}
                ><MySnackbarContentWrapper
                    onClose={this.handleClose}
                    variant="success"
                    message={this.props.message}
                /></Snackbar>
            </div>
        );
    }
}


// 从store里面取数据给组件
const mapStateToProps = (state) => {
    // console.log("232234242  " + JSON.stringify(state))
    return {
        open: state.reducer.common.open,
        message: !!state.reducer.common.message ? state.reducer.common.message : ""
    }
};

export default connect(mapStateToProps)(withStyles(styles2)(Reminder));
