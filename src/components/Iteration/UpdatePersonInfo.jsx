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
import {closeUpdatePersonInfo, savePersonInfo} from "../../actions/IterationAction";
import {ADD_ITERATION, EDIT_ITERATION} from "../../actions/types";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import {validating} from "../../actions/validateAction";
import {error} from "../../actions/NotificationAction";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
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

class UpdatePersonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            iterationContent: {},
            errorList: {},
            title : "新增版本"
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.action === ADD_ITERATION) {

            this.setState({
                iterationContent: {},title:"新增版本"
            })
        }else if(nextProps.action === EDIT_ITERATION){
            this.setState({title : "编辑版本"})
        }


        this.setState({iterationContent: nextProps.editData, action: nextProps.action});

    }

    handleClose = () => {
        closeUpdatePersonInfo();
    };

    handleSave = () => {

        let ret = validating(this.state.iterationContent, "iterationProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }

        savePersonInfo(this.state.iterationContent);
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
        const {buttonStyle, classes} = this.props;
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
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} fullWidth
                    maxWidth="lg">
                <DialogTitle id="simple-dialog-title">编辑人员信息</DialogTitle>
                <DialogContent>
                    <Card className={classes.card}>
                        <CardHeader title="上线相关" className={classes.cardHeader} classes={{title : classes.headerLine}}/>

                        <CardContent className={classes.cardContent}>
                            <Grid container spacing={8}>
                                <Grid item xs={6} className={classes.gridStyle}>

                                    <TrueMuitiSelect data={projectMember4SingleSelect} onChange={this.getContent}
                                                     nameIn="deliveryPersonInChargeId"
                                                     label="上线负责人"
                                                     defaultValue={defaultDeliveryPersonInCharge}
                                                     singleSelect
                                    />
                                </Grid>

                                <Grid item xs={6} className={classes.gridStyle}>
                                    <TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}
                                                     nameIn="deliveryCheckers"
                                                     defaultValue={defaultCheckers}
                                                     label="上线检查人"
                                    />
                                </Grid>
                                <Grid item xs={6} className={classes.gridStyle}>
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

UpdatePersonInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    return {
        editData: !!state.reducer.iteration.editData ? state.reducer.iteration.editData : "",
        action: state.reducer.iteration.action,
        projectMembers: state.reducer.common.projectMembers
    }
};

export default connect(mapStateToProps)(withStyles(styles)(UpdatePersonInfo));
