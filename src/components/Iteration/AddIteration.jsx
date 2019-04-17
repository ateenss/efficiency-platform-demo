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
import {closeAddIteration, saveIteration} from "../../actions/IterationAction";
import GlobalValidateRegex from "../../constants/GlobalValidateRegex";
import {ADD_ITERATION, EDIT_ITERATION} from "../../actions/types";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import {Rules, validating} from "../../actions/validateAction";
import {error} from "../../actions/NotificationAction";


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

};

class AddIteration extends React.Component {
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
                iterationContent: {}
            })
        }else if(nextProps.action === EDIT_ITERATION){
            this.setState({title : "编辑版本"})
        }


        this.setState({iterationContent: nextProps.editData, action: nextProps.action});

    }

    handleClose = () => {
        closeAddIteration();
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

        let defaultCheckers = [];
        let defaultPersons = [];
        for (let i in this.props.projectMembers) {

            let member = this.props.projectMembers[i];

            let ret = {
                id: member.name,
                label: member.name,
                group:member.deptName

            };
            for(let idx in this.state.iterationContent.deliveryCheckers){
                let unit = this.state.iterationContent.deliveryCheckers[idx];
                if(unit  === member.name){
                    defaultCheckers.push({id : member.name, label : member.name, group : member.deptName})
                }

            }

            for(let idx in this.state.iterationContent.deliveryPersons){
                let unit = this.state.iterationContent.deliveryPersons[idx];
                if(unit  === member.name){
                    defaultPersons.push({id : member.name, label : member.name, group : member.deptName})
                }

            }


            projectMember4MultiSelect.push(ret);
        }
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} fullWidth
                    maxWidth="lg">
                <DialogTitle id="simple-dialog-title">{this.state.title}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={8} className={classes.gridStyle}>
                            <InputField
                                nameIn="iterationCode"
                                onChange={this.getContent}
                                InputLabelName="版本编号"
                                defaultValue={this.state.iterationContent.iterationCode}
                                validateEl={Rules.iterationProps.iterationCode}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="iterationName"
                                onChange={this.getContent}
                                InputLabelName="版本名称"
                                defaultValue={this.state.iterationContent.iterationName}
                                validateEl={Rules.iterationProps.iterationName}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="版本负责人" nameIn="iterationOwnerId"
                                          nameArray={this.props.projectMembers}
                                          defaultValue={this.state.iterationContent.iterationOwnerId}
                                          validateEl={Rules.iterationProps.iterationOwnerId}
                            />

                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="testDate" InputLabelName="提测时间" onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.testDate}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="publishDate" InputLabelName="发布时间" onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.publishDate}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="deliveryDate" InputLabelName="上线时间" onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.deliveryDate}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="developPlanSubmitDate" InputLabelName="开发方案提交时间"
                                        onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.developPlanSubmitDate}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="codeReviewDate" InputLabelName="代码走查时间" onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.codeReviewDate}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="ciDate" InputLabelName="持续集成执行时间" onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.ciDate}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField onChange={this.getContent} InputLabelName="Bugzilla" nameIn="bugzillaId"
                                        nameArray={initialData}
                                        defaultValue={this.state.iterationContent.bugzillaId}
                                        expr={GlobalValidateRegex.strRegex}
                                        maxLength="10"
                                        validate={this.validate}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="上线负责人"
                                          nameIn="deliveryPersonInChargeId"
                                          nameArray={this.props.projectMembers}
                                          defaultValue={this.state.iterationContent.deliveryPersonInChargeId}

                            />

                        </Grid>
                        {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                        {/*<MultiSelect onChange={this.getContent} InputLabelName="上线检查人" nameIn="deliveryCheckers"*/}
                        {/*nameArray={projectMember4MultiSelect}*/}
                        {/*defaultValue={this.state.iterationContent.deliveryCheckers}*/}
                        {/*required*/}
                        {/*validate={this.validate}*/}


                        {/*/>*/}

                        {/*</Grid>*/}
                        {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                        {/*<MultiSelect onChange={this.getContent} InputLabelName="上线人" nameIn="deliveryPersons"*/}
                        {/*nameArray={projectMember4MultiSelect}*/}
                        {/*defaultValue={this.state.iterationContent.deliveryPersons}*/}
                        {/*required*/}
                        {/*validate={this.validate}*/}

                        {/*/>*/}

                        {/*</Grid>*/}
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

AddIteration.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    return {
        initialData: state.reducer.iteration.initialData,
        editData: !!state.reducer.iteration.editData ? state.reducer.iteration.editData : "",
        action: state.reducer.iteration.action,
        projectMembers: state.reducer.common.projectMembers
    }
};

export default connect(mapStateToProps)(withStyles(styles)(AddIteration));
