import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import store from "../../stores";
import EditQuill from "../SelfComponent/EditQuill"
import {
    closeTaskEdit,
    submitAndChange2Dev,
    saveDevPlan,
} from "../../actions/BuildMissionAction"
import InputField from "../SelfComponent/InputField"
import DatePicker from "../SelfComponent/DatePicker"
import permProcessor from "../../constants/PermProcessor";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import {validating} from "../../actions/validateAction";
import {error} from "../../actions/NotificationAction";


const styles = {
    appBar: {
        position: 'relative',
        boxShadow:"none",
        color:"#292929",
        background:"#f5f5f5"
    },
    flex: {
        flex: 1,
    },
    dialogContainer: {
        margin: "24px"
    },
    taskInput: {
        fontSize: 20,
        marginTop: 10
    },
    taskLabel: {
        fontSize: 22
    },
    quillContainer: {
        marginTop: "10px",
        height:"500px"
    },
    quillLabel: {
        fontSize: "16px",
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: "15px"
    },
    quillIn:{
        height:"400px"
    },

};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
class DevTaskEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            data: {},
            taskName:null,
            taskID:null,
            taskContent:"11",
            errorList: {},
            tempTaskId:null,
            taskEditorContent:null,
            perm: permProcessor.init('task')
        }
    }

    componentWillReceiveProps(nextProps, nextStatus) {
        if (nextProps.tempTask.content && nextProps.action === "OPEN_TASK_EDITOR") {
            this.setState({
                taskContent: nextProps.tempTask.content,
                tempTaskId: nextProps.tempTask.taskID
            });
        }
    }

    handleClose = () => {
        store.dispatch(closeTaskEdit())

    };


    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.taskContent, {
                [keyNote]: value
            });
            this.setState({
                taskContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.taskContent, {
                [keyNote]: value
            });
            this.setState({
                taskContent:data
            })
        }
    };


    save=()=>{
        if(this.state.taskContent.devPlan===null){
            delete this.state.taskContent.devPlan;
        }
        let ret = validating(this.state.taskContent, "taskEditProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }
        if (permProcessor.bingo('saveTaskEditor', this.state.perm)) {
            saveDevPlan(this.state.taskContent,this.props.demands.taskId);
        }
    };


    onSubmit = () => {
        if(this.state.taskContent.devPlan===null){
            delete this.state.taskContent.devPlan;
        }
        let ret = validating(this.state.taskContent, "taskEditProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }
        if (permProcessor.bingo('getDemandTaskDetail', this.state.perm)) {

            submitAndChange2Dev(this.state.tempTaskId,this.state.taskContent,this.props.demands.taskId);
        }else{
            console.log("您无此项权限");
        }
    };
    validate = (keyValue) => {

        let errorList = this.state.errorList;
        errorList[keyValue.name] = keyValue.hasError;

        this.setState({errorList: errorList});
    };

    isOrNotSubmit=()=>{
        let show=(<Button color="inherit" onClick={this.onSubmit}>
            提交
        </Button>);
        if (this.props.tempTask.content!=null) {
            if (this.props.tempTask.content.taskStatus===1&&(this.props.devTaskActionShow||this.props.allActonShow)) {
                return show
            }
        }
        return ""

    };
    isOrNotSave=()=>{
        let show=(<Button color="inherit" onClick={this.save}>
            保存
        </Button>);
        if (this.props.devTaskActionShow||this.props.allActonShow) {
            return show;
        }
        return ""
    };

    devTaskNameShow=()=>{
        if (this.props.devEditorCanShow) {
            return "编辑开发任务"
        }
        return "查看开发任务"
    };


    render() {

        const{taskContent}=this.state;
        const {classes,taskEditorShow} = this.props;


        let defaultModules = [];
        for(let j in this.props.modules){
            let unit = this.props.modules[j];
            if(taskContent.involveModule === unit.id){
                defaultModules.push({id : unit.id, label : unit.label, group : unit.group})
            }


        }
        let demandDevOwnerIdSelect = [];
        let projectMember4MultiSelect = [];
        for (let i in this.props.projectMembers) {

            let member = this.props.projectMembers[i];

            let ret = {
                id: member.id,
                label: member.name + "(" + member.username + ")",
                group:member.deptName

            };
            if(this.state.taskContent.taskOwner  === member.id){
                demandDevOwnerIdSelect.push(ret)
            }
            projectMember4MultiSelect.push(ret);
        }



        return (

            <div>
                <Dialog   open={taskEditorShow}  TransitionComponent={Transition}  fullWidth maxWidth="xl">
                    <AppBar className={classes.appBar} color="default">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="headline" align="center" color="inherit" className={classes.flex}>
                                {/*编辑开发任务*/}
                                {this.devTaskNameShow()}
                            </Typography>
                            {this.isOrNotSave()}
                            {this.isOrNotSubmit()}
                        </Toolbar>
                    </AppBar>
                    <DialogContent className={classes.dialogContainer}>
                        <Grid container spacing={16}>
                            <Grid xs={6} item>
                                <InputField
                                    InputLabelName="任务名称"
                                    onChange={this.getContent}
                                    nameIn="taskName"
                                    defaultValue={taskContent.taskName}
                                />
                            </Grid>
                            <Grid item xs={6} className={classes.gridStyle}>
                                <InputField
                                    nameIn="estimateWorkTime"
                                    onChange={this.getContent}
                                    InputLabelName="预估工时"
                                    defaultValue={taskContent.estimateWorkTime}
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
                                                 defaultValue={demandDevOwnerIdSelect}
                                />

                            </Grid>
                            <Grid xs={6} item>
                                <DatePicker nameIn="taskDeadline"
                                            InputLabelName="任务结束时间"
                                            onDateChange={this.getContent}
                                            defaultValue={taskContent.taskDeadline}
                                />
                            </Grid>
                            <Grid xs={6} item>
                                <InputField
                                    onChange={this.getContent}
                                    InputLabelName="任务状态"
                                    nameIn="taskStatus"
                                    defaultValue={taskContent.taskStatus}
                                    disabled={true}
                                />
                            </Grid>
                        </Grid>

                        <Typography className={classes.quillLabel}>开发方案</Typography>
                                    <EditQuill
                                        classStyle={classes.quillContainer}
                                        onChange={this.getContent}
                                        nameIn="devPlan"
                                        defaultValue={taskContent.devPlan}
                                        placeholder="请输入方案描述"
                                    />

                    </DialogContent>
                </Dialog>
            </div>
        )
    };
}

// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        task: state.reducer.task.task,
        openTask: state.reducer.task.openTask,
        taskEditorShow: state.reducer.buildMission.taskEditorShow,
        tempTask: state.reducer.buildMission.tempTask,
        projectMembers:state.reducer.common.projectMembers,
        demands:state.reducer.buildMission.demands,
        action:state.reducer.buildMission.action,
        modules : state.reducer.buildMission.modules,
        devEditorCanShow : state.reducer.buildMission.devEditorCanShow,
        devTaskActionShow : state.reducer.buildMission.devTaskActionShow,
        allActonShow : state.reducer.buildMission.allActonShow
    }
};

export default connect(mapStateToProps)(withStyles(styles)(DevTaskEditor));
