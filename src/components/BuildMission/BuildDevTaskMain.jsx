import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import DatePicker from "../SelfComponent/DatePicker"
import {closeBuildModule, saveBuildModule} from "../../actions/BuildMissionAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import permProcessor from "../../constants/PermProcessor";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import {Rules, validating} from "../../actions/validateAction";
import {error} from "../../actions/NotificationAction";


const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buttonStyle:{
        textAlign: 'center',
        position: 'absolute',
        right: 0,
    },
    gridStyle:{
        marginTop:"15px"
    },
    item:{
        paddingTop:"60px"
    },
    quillIn:{
        height:"300px"
    },
    quillLabel: {
        fontSize: "16px",
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: "15px"
    },

};

class BuildDevTaskMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            moduleContent:{

            },
            errorList: {},
            perm: permProcessor.init('task')
        }
    }




    handleClose = () => {
        store.dispatch(closeBuildModule());
    };
    handleSave=()=>{
        let ret = validating(this.state.moduleContent, "taskProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }
        let saveContent=this.state.moduleContent;
        saveContent["taskId"]=this.props.demands.taskId;
        if (permProcessor.bingo('saveNewDevTask', this.state.perm)) {
            saveBuildModule(saveContent,this.props.demands.taskId);
        }else{
            console.log("您没有此项权限");
        }
        store.dispatch(closeBuildModule());
    };



    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.moduleContent, {
                [keyNote]: value
            });
            this.setState({
                moduleContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.moduleContent, {
                [keyNote]: value
            });
            this.setState({
                moduleContent:data
            })
        }
    };

    validate = (keyValue) => {

        let errorList = this.state.errorList;
        errorList[keyValue.name] = keyValue.hasError;

        this.setState({errorList: errorList});
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            moduleContent:{}
        })
    }


    render() {
        const {classes,buttonStyle} = this.props;
        let defaultModules = [];
        const{moduleContent}=this.state;
        for(let j in this.props.modules){
            let unit = this.props.modules[j];
            if(moduleContent.involveModule === unit.id){
                defaultModules.push({id : unit.id, label : unit.label, group : unit.group})
            }
        }
        let projectMember4MultiSelect = [];
        for (let i in this.props.projectMembers) {

            let member = this.props.projectMembers[i];

            let ret = {
                id: member.id,
                label: member.name + "(" + member.username + ")",
                group:member.deptName

            };
            projectMember4MultiSelect.push(ret);
        }
        let finalTaskName=this.props.demands.taskName;
        let taskChildList=this.props.demands.taskDetailList;
        let number=taskChildList.finish.length+taskChildList.plan.length+taskChildList.develop.length+taskChildList.integration.length+taskChildList.goTest.length;
        finalTaskName=finalTaskName+"#"+(number+1).toString();


        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} fullWidth maxWidth="lg">
                <DialogTitle id="simple-dialog-title">创建开发任务</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={6} className={classes.gridStyle}>
                            <InputField
                                nameIn="taskName"
                                onChange={this.getContent}
                                InputLabelName="任务名称"
                                defaultValue={finalTaskName}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.gridStyle}>
                            <DatePicker nameIn="taskDeadline" InputLabelName="任务截至时间"  onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={3} className={classes.gridStyle}>
                            <InputField
                                nameIn="estimateWorkTime"
                                onChange={this.getContent}
                                InputLabelName="预估工时"
                                validateEl={Rules.taskProps.estimateWorkTime}
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.gridStyle}>
                            <TrueMuitiSelect data={this.props.modules} onChange={this.getContent}
                                             nameIn="involveModule"
                                             label="涉及模块"
                                             singleSelect
                                             defaultValue={defaultModules}
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.gridStyle}>
                            <TrueMuitiSelect data={projectMember4MultiSelect}
                                             onChange={this.getContent}
                                             nameIn="taskOwner"
                                             label="开发人员"
                                             singleSelect
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

BuildDevTaskMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    return {
        buildDemandShow:state.reducer.buildDemand.buildDemandShow,
        demands:state.reducer.buildMission.demands,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(BuildDevTaskMain));
