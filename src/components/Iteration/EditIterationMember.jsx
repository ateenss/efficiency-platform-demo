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
import DatePicker from "../SelfComponent/DatePicker"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import SingleSelect from "../SelfComponent/SingleSelect"
import {closeAddIteration, saveIteration,closeEditIterationMember} from "../../actions/IterationAction";
import GlobalValidateRegex from "../../constants/GlobalValidateRegex";
import {ADD_ITERATION, EDIT_ITERATION} from "../../actions/types";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import {Rules, validating} from "../../actions/validateAction";
import {error} from "../../actions/NotificationAction";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";


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

class EditIterationMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            iterationContent: {},
            errorList: {},
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {


        this.setState({iterationContent: nextProps.editData, action: nextProps.action});

    }

    handleClose = () => {
        closeEditIterationMember();
    };

    handleSave = () => {

        let ret = validating(this.state.iterationContent, "iterationProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }

        saveIteration(this.state.action, this.state.iterationContent);
    };


    getContent = (e) => {
        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.iterationContent, {
                [keyNote]: value
            });
            this.setState({
                iterationContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.iterationContent, {
                [keyNote]: value
            });
            this.setState({
                iterationContent: data
            })
        }

    };


    render() {
        const {initialData, buttonStyle, classes} = this.props;
        let projectMember4MultiSelect = [];
        let projectMember4SingleSelect=[];
        let defaultCheckers = [];
        let defaultPersons = [];
        let defaultOwner =[];
        let defaultDeliveryPersonInCharge = [];
        for (let i in this.props.projectMembers) {

            let member = this.props.projectMembers[i];

            let ret = {
                id: member.name,
                label: member.name + "(" + member.username + ")",
                group:member.deptName

            };
            for(let idx in this.state.iterationContent.deliveryCheckers){
                let unit = this.state.iterationContent.deliveryCheckers[idx];
                if(unit  === member.name){
                    defaultCheckers.push(ret)
                }

            }

            for(let idx in this.state.iterationContent.deliveryPersons){
                let unit = this.state.iterationContent.deliveryPersons[idx];
                if(unit  === member.name){
                    defaultPersons.push(ret)
                }

            }

            let singleSelect = {
                id: member.id,
                label: member.name + "(" + member.username + ")",
                group:member.deptName

            };

            if(this.state.iterationContent.iterationOwnerId  === member.id){
                defaultOwner.push(singleSelect)
            }
            if(this.state.iterationContent.deliveryPersonInChargeId  === member.id){
                defaultDeliveryPersonInCharge.push(singleSelect)
            }


            projectMember4MultiSelect.push(ret);
            projectMember4SingleSelect.push(singleSelect);
        }
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.openEditIterationMember}>
                <DialogTitle id="simple-dialog-title">编辑版本人员信息</DialogTitle>
                <DialogContent>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Grid container spacing={8}>
                                <Grid item xs={12} className={classes.gridStyle}>

                                    <TrueMuitiSelect data={projectMember4SingleSelect} onChange={this.getContent}
                                                     nameIn="deliveryPersonInChargeId"
                                                     label="上线负责人"
                                                     defaultValue={defaultDeliveryPersonInCharge}
                                                     singleSelect
                                    />
                                </Grid>

                                <Grid item xs={12} className={classes.gridStyle}>
                                    <TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}
                                                     nameIn="deliveryCheckers"
                                                     defaultValue={defaultCheckers}
                                                     label="上线检查人"
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.gridStyle}>
                                    <TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}
                                                     nameIn="deliveryPersons"
                                                     defaultValue={defaultPersons}
                                                     label="上线人"
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

EditIterationMember.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    return {
        initialData: state.reducer.iteration.initialData,
        editData: !!state.reducer.iteration.editData ? state.reducer.iteration.editData : "",
        action: state.reducer.iteration.action,
        projectMembers: state.reducer.common.projectMembers,
        openEditIterationMember : state.reducer.iteration.openEditIterationMember
    }
};

export default connect(mapStateToProps)(withStyles(styles)(EditIterationMember));
