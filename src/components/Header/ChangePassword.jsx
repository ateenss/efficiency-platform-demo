import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {Rules, validating} from "../../actions/validateAction";
import Grid from "@material-ui/core/Grid";
import InputField from "../SelfComponent/InputField";
import {error} from "../../actions/NotificationAction";
import {connect} from "react-redux";
import {closeChangePassword, saveChangePassword} from "../../actions/CommonAction";
import DialogTitle from "@material-ui/core/DialogTitle";
import {SAVE_CHANGE_PASSWORD} from "../../actions/types";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class ChangePassword extends React.Component {

    state = {
        changePwdContent: {},
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({showChangePassword: nextProps.showChangePassword})

    }

    handleClose = () =>{
        closeChangePassword();
    }
    
    handleChangePassword = () =>{


        let ret = validating(this.state.changePwdContent, "changePwdProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }

        saveChangePassword(this.state.changePwdContent);

    }



    getContent = (e) => {
        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.changePwdContent, {
                [keyNote]: value
            });
            this.setState({
                changePwdContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.changePwdContent, {
                [keyNote]: value
            });
            this.setState({
                changePwdContent: data
            })
        }

    };


    render() {
        const {classes} = this.props;
        return (

            <Dialog  onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.showChangePassword} fullWidth maxWidth="sm">
                <DialogTitle id="simple-dialog-title">修改密码</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="oldPwd"
                                onChange={this.getContent}
                                InputLabelName="旧密码"
                                validateEl={Rules.changePwdProps.oldPwd}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="newPwd"
                                onChange={this.getContent}
                                InputLabelName="新密码"
                                validateEl={Rules.changePwdProps.newPwd}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="confirmPwd"
                                onChange={this.getContent}
                                InputLabelName="确认新密码"
                                validateEl={Rules.changePwdProps.confirmPwd}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleChangePassword}>确定</Button>
                </DialogActions>

            </Dialog>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        showChangePassword: state.reducer.common.showChangePassword,
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme:true})(ChangePassword));
