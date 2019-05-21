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
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import CascadeSelect from "./CascadeSelect";
import CircularProgress from "@material-ui/core/CircularProgress";
import classNames from 'classnames';
import {green} from "@material-ui/core/colors";


const styles = theme => ({
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
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        color:"#FFF",
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonRoot:{
        background:"#4DAF7C",
        color:"#FFF",
        '&:hover':{
            background:"#4DAF7C",

        }
    }

});

class AddIteration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            iterationContent: {},
            errorList: {},
            title : "新增版本",
            loading : false,
            success : false
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
        closeAddIteration();
    };

    handleSave = () => {

        let self = this;

        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true,
                },
                () => {

                    this.timer = setTimeout(() => {


                        let ret = validating(self.state.iterationContent, "iterationProps");
                        if(!ret.result){
                            error(ret.message);
                            return false;
                        }

                        saveIteration(self.state.action, self.state.iterationContent);


                        this.setState({
                            loading: false,
                            success: true,
                        });
                    }, 2000);
                },
            );
        }

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
        const {success, loading} = this.state;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
            [classes.buttonRoot] : !success

        });
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
                <DialogTitle id="simple-dialog-title">{this.state.title}</DialogTitle>
                <DialogContent>
                    <Card className={classes.card}>
                        <CardHeader title="基本信息" className={classes.cardHeader} classes={{title : classes.headerLine}}/>

                        <CardContent className={classes.cardContent}>
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
                                    />
                                </Grid>
                                <Grid item xs={6} className={classes.gridStyle}>
                                    <TrueMuitiSelect data={projectMember4SingleSelect} onChange={this.getContent}
                                                     nameIn="iterationOwnerId"
                                                     label="版本负责人"
                                                     defaultValue={defaultOwner}
                                                     singleSelect
                                    />
                                </Grid>
                                <Grid item xs={3} className={classes.gridStyle}>
                                    <InputField onChange={this.getContent} InputLabelName="Bugzilla" nameIn="bugzillaId"
                                                nameArray={initialData}
                                                defaultValue={this.state.iterationContent.bugzillaId}

                                    />
                                </Grid>
                                <Grid item xs={3} className={classes.gridStyle}>
                                    <InputField onChange={this.getContent} InputLabelName="变更号" nameIn="plateformCode"
                                                nameArray={initialData}
                                                defaultValue={this.state.iterationContent.plateformCode}

                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardHeader title="版本进度" className={classes.cardHeader} classes={{title : classes.headerLine}}/>

                        <CardContent className={classes.cardContent} style={{paddingTop:"32px"}}>
                            <Grid container spacing={8}>
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
                                    <DatePicker nameIn="testDate" InputLabelName="提测时间" onDateChange={this.getContent}
                                                defaultValue={this.state.iterationContent.testDate}z
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
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardHeader title="关联版本" className={classes.cardHeader} classes={{title : classes.headerLine}}/>

                        <CardContent className={classes.cardContent} style={{paddingTop:"32px"}}>
                            <CascadeSelect onChange={this.getContent}/>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={buttonStyle}>
                        取消
                    </Button>
                    <div className={classes.wrapper}>
                        <Button onClick={this.handleSave} variant="contained"  className={buttonClassname} disabled={loading}>
                            提交
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>

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
