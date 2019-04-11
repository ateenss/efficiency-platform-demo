import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import DatePicker from "../SelfComponent/DatePicker"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import SingleSelect from "../SelfComponent/SingleSelect"
import {closeAddIteration, saveIteration} from "../../actions/IterationAction";
import MultiSelect from "../SelfComponent/MultiSelect"
import GlobalValidateRegex from "../../constants/GlobalValidateRegex";
import {ADD_ITERATION, EDIT_ITERATION, SAVE_ADD_ITERATION, SHOW_NOTIFICATION} from "../../actions/types";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";


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
            errorList: {}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.action === ADD_ITERATION) {

            let iterationContnet = {
                iterationOwnerId: this.props.projectMembers[0].id,
                deliveryPersonInChargeId: this.props.projectMembers[0].id
            };


            this.setState({
                iterationContent: iterationContnet
            })
        }


        this.setState({iterationContent: nextProps.editData, action: nextProps.action});

    }

    handleClose = () => {
        closeAddIteration();
    };

    handleSave = () => {
        if (this.props.action === ADD_ITERATION) {
            if (JSON.stringify(this.state.errorList) === "{}") {
                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: {type: "error", message: "诶。。好像有错你也要提交"}
                });
                return false;
            }
        }
        for (let i in this.state.errorList) {
            if (this.state.errorList[i] === true) {
                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: {type: "error", message: "诶。。好像有错你也要提交"}
                });
                return false;
            }
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

    validate = (keyValue) => {

        let errorList = this.state.errorList;
        errorList[keyValue.name] = keyValue.hasError;

        this.setState({errorList: errorList});
    };


    render() {
        const {initialData, buttonStyle, classes} = this.props;
        let projectMember4MultiSelect = [];
        for (let i in this.props.projectMembers) {

            let unit = this.props.projectMembers[i];

            let ret = {
                id: unit.name,
                label: unit.name,
                group:unit.deptName

            }

            projectMember4MultiSelect.push(ret);
        }


        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} fullWidth
                    maxWidth="xl">
                <DialogTitle id="simple-dialog-title">新增版本</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={8} className={classes.gridStyle}>
                            <InputField
                                nameIn="iterationCode"
                                onChange={this.getContent}
                                InputLabelName="版本编号"
                                defaultValue={this.state.iterationContent.iterationCode}
                                required
                                expr={GlobalValidateRegex.projectCodeRegex}
                                maxLength="10"
                                validate={this.validate}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="iterationName"
                                onChange={this.getContent}
                                InputLabelName="版本名称"
                                defaultValue={this.state.iterationContent.iterationName}
                                required
                                expr={GlobalValidateRegex.strRegex}
                                maxLength="10"
                                validate={this.validate}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="版本负责人" nameIn="iterationOwnerId"
                                          nameArray={this.props.projectMembers}
                                          defaultValue={this.state.iterationContent.iterationOwnerId}

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
                                             defaultValue={this.state.iterationContent.deliveryCheckers}
                                             label="上线检查人"
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.gridStyle}>
                            <TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}
                                             nameIn="deliveryPersons"
                                             defaultValue={this.state.iterationContent.deliveryPersons}
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
    console.log("map数据:" + JSON.stringify(state.reducer.iteration.editData));
    return {
        initialData: state.reducer.iteration.initialData,
        editData: !!state.reducer.iteration.editData ? state.reducer.iteration.editData : "",
        action: state.reducer.iteration.action,
        projectMembers: state.reducer.common.projectMembers
    }
};

export default connect(mapStateToProps)(withStyles(styles)(AddIteration));
