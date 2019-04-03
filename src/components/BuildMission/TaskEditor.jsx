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
import ReactQuill from "react-quill";
import {saveTask} from "../../actions/DemandTasksAction";
import TigerInput from "../Input/TigerInput"
import store from "../../stores";
import {SAVE_TASK, SHOW_NOTIFICATION} from "../../actions/types";
import EditQuill from "../SelfComponent/EditQuill"
import {closeTaskEdit,
    submitAndChange2Dev,
    saveDevPlan,
    getDemandTaskDetail,
    } from "../../actions/BuildMissionAction"
import InputField from "../SelfComponent/InputField"
import DatePicker from "../SelfComponent/DatePicker"
import SingleSelect from "../SelfComponent/SingleSelect"


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
        height:"300px"
    },
    quillLabel: {
        fontSize: "16px",
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: "15px"
    },
    quillIn:{
        height:"300px"
    },

};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class TaskEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            data: {},
            taskName:null,
            taskID:null,
            taskContent:null,
            errorList: {},
            tempTaskId:null,
            taskEditorContent:null
        }
    }

    componentWillReceiveProps(nextProps, nextStatus) {
        if (nextProps.tempTask.content) {
            if(nextProps.tempTask.content.taskName){
            this.setState({
                taskName:nextProps.tempTask.content.taskName,
                taskContent:nextProps.tempTask.content,
                tempTaskId:nextProps.tempTask.taskID
            });
        }}
    }

    handleClose = () => {
        /*getDemandTaskDetail(this.props.demands.taskId);*/
        store.dispatch(closeTaskEdit())

    };

    handleInput = (e) =>{
        const key = e.target.name;
        this.state.data[key] = e.target.value;
        this.setState(this.state.data);
    };

    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.taskEditorContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                taskEditorContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.taskEditorContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                taskEditorContent:data
            })
        }
    };

    contentModify=()=>{
        let tempData=this.state.taskEditorContent;
        tempData["taskCode"]=this.state.taskContent.taskCode;
        tempData["taskId"]=this.state.taskContent.taskId;
        if (!tempData.taskName){
            tempData["taskName"]=this.state.taskContent.taskName
        }
        if (!tempData.ownerId){
            tempData["ownerId"]=this.state.taskContent.taskOwner
        }
        if (!tempData.taskDeadline){
            tempData["taskDeadline"]=this.state.taskContent.taskDeadline
        }
        if (!tempData.involveModule){
            tempData["involveModule"]=this.state.taskContent.involveModule
        }
        tempData["ownerId"]= parseInt(tempData["ownerId"]);
        return tempData
    };


    save=()=>{
        saveDevPlan(this.contentModify(),this.props.demands.taskId);
    };


    //todo:缺少module字段
    onSubmit = () => {
        submitAndChange2Dev(this.state.tempTaskId,this.contentModify(),this.props.demands.taskId);
    };
    validate = (keyValue) => {

        let errorList = this.state.errorList;
        errorList[keyValue.name] = keyValue.hasError;

        this.setState({errorList: errorList});
    };

    render() {
        const taskContent=!!this.state.taskContent?this.state.taskContent:"";
        let timeFormat=null;
        if (this.state.taskContent){
            timeFormat=taskContent.taskDeadline.split(" ")[0];
        }
        const {classes,taskEditorShow,projectMembers} = this.props;
        return (

            <div>
                <Dialog   open={taskEditorShow}  TransitionComponent={Transition}>
                    <AppBar className={classes.appBar} color="default">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="headline" align="center" color="inherit" className={classes.flex}>
                                编辑任务
                            </Typography>
                            <Button color="inherit" onClick={this.save}>
                                保存
                            </Button>
                            <Button color="inherit" onClick={this.onSubmit}>
                                提交
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent className={classes.dialogContainer}>
                        <Grid container spacing={16}>
                            <Grid xs={8} item>
                                <InputField
                                    InputLabelName="任务名称"
                                    onChange={this.getContent}
                                    nameIn="taskName"
                                    defaultValue={this.state.taskName}
                                    validate={this.validate}
                                />
                            </Grid>
                            {/*<Grid xs={4} item>
                                <InputField
                                    InputLabelName="开发人员"
                                    onChange={this.getContent}
                                    nameIn="taskOwner"
                                    validate={this.validate}
                                />
                            </Grid>*/}
                            <Grid item xs={4} className={classes.gridStyle}>
                                <SingleSelect
                                    onChange={this.getContent}
                                    InputLabelName="开发人员"
                                    validate={this.validate}
                                    nameIn="ownerId"
                                    nameArray={projectMembers}/>
                            </Grid>
                            <Grid xs={4} item>
                                <DatePicker nameIn="taskDeadline"
                                            InputLabelName="任务结束时间"
                                            onDateChange={this.getContent}
                                            defaultValue={timeFormat} />
                            </Grid>
                            <Grid item xs={4} className={classes.gridStyle}>
                                <InputField InputLabelName="涉及模块"
                                            nameIn="involveModule"
                                            validate={this.validate}
                                            onChange={this.getContent}
                                            defaultValue={taskContent.involveModule}
                                />
                            </Grid>
                            <Grid xs={4} item>
                                <InputField
                                    onChange={this.getContent}
                                    InputLabelName="任务状态"
                                    nameIn="taskStatus"
                                    defaultValue={taskContent.taskStatus}
                                    disabled={true}
                                    validate={this.validate}
                                />
                            </Grid>
                        </Grid>
                        <Typography className={classes.quillLabel}>开发方案</Typography>
                                    <EditQuill
                                        classStyle={classes.quillContainer}
                                        onChange={this.getContent}
                                        nameIn="devPlan"
                                        defaultValue={taskContent.devPlan}
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
        action : state.reducer.task.action,
        task: state.reducer.task.task,
        openTask: state.reducer.task.openTask,
        detailMissionShow:state.reducer.buildMission.detailMissionShow,
        taskEditorShow: state.reducer.buildMission.taskEditorShow,
        tempTask: state.reducer.buildMission.tempTask,
        projectMembers:state.reducer.common.projectMembers,
        demands:state.reducer.buildMission.demands
    }
};

export default connect(mapStateToProps)(withStyles(styles)(TaskEditor));
