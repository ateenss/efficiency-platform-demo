import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {closeChangeTaskOwner, saveChangeTaskOwner} from "../../actions/BuildMissionAction";


const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buttonStyle: {
        textAlign: 'center',
        position: 'absolute',
        right: 0,
    },
    gridStyle: {
        marginTop: "15px"
    },
    card:{
        boxShadow:"none"

    },
    cardHeader:{
        fontSize:"16px",
        paddingBottom:"0"
    },
    cardContent:{
        paddingTop:"0",
    },
    headerLine:{
        fontSize:"16px"
    }

};

class ChangeTaskOwner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            changeTaskOwnerContent: {},
            errorList: {},
            title : "变更负责人"
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    handleClose = () => {
        closeChangeTaskOwner();
    };

    handleSave = () => {

        saveChangeTaskOwner(this.props.taskId, this.state.changeTaskOwnerContent.taskOwner);
    };


    getContent = (e) => {
        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.changeTaskOwnerContent, {
                [keyNote]: value
            });
            this.setState({
                changeTaskOwnerContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.changeTaskOwnerContent, {
                [keyNote]: value
            });
            this.setState({
                changeTaskOwnerContent: data
            })
        }

    };


    render() {
        const {buttonStyle, classes} = this.props;
        let open = !!this.props.openTaskOwnerEditor ? this.props.openTaskOwnerEditor : false;

        let prevTaskOwner = [];
        let projectMember4SingleSelect=[];
        let defaultDeliveryPersonInCharge = [];
        for (let i in this.props.projectMembers) {

            let member = this.props.projectMembers[i];

            let singleSelect = {
                id: member.id,
                label: member.name + "(" + member.username + ")",
                group:member.deptName

            };

            if(this.props.ownerId === singleSelect.id){
                prevTaskOwner.push(singleSelect);
            }

            projectMember4SingleSelect.push(singleSelect);
        }

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth
                    maxWidth="md">
                <DialogTitle id="simple-dialog-title">编辑人员信息</DialogTitle>
                <DialogContent>
                    <Card className={classes.card}>

                        <CardContent className={classes.cardContent}>
                            <Grid container spacing={8}>
                                <Grid item xs={12} className={classes.gridStyle}>

                                    <TrueMuitiSelect data={projectMember4SingleSelect} onChange={this.getContent}
                                                     nameIn="taskOwner"
                                                     label="任务负责人"
                                                     defaultValue={prevTaskOwner}
                                                     singleSelect
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={buttonStyle}>
                        取消
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ChangeTaskOwner.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    return {
        action: state.reducer.buildMission.action,
        projectMembers: state.reducer.common.projectMembers,
        openTaskOwnerEditor: state.reducer.buildMission.openTaskOwnerEditor,
        ownerId : state.reducer.buildMission.taskOwner,
        taskId : state.reducer.buildMission.taskId,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(ChangeTaskOwner));
