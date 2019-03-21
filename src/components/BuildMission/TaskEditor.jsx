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
    changeStatusToPlan,
    changeStatusToDev,
    changeStatusToJointTrial,
    changeStatusToJointTest} from "../../actions/BuildMissionAction"
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
            taskID:null
        }
    }

    componentWillReceiveProps(nextProps, nextStatus) {
        if(nextProps.tempTask.content.taskName){
            this.setState({
                taskName:nextProps.tempTask.content.taskName
            })
        }
        !!nextProps.tempTask.taskID&&this.setState({
            taskID:nextProps.tempTask.taskID
        })

        if(nextProps.action === "saveTask"){
            this.setState({
                openTask: nextProps.openTask
            });
            setTimeout(function(){

                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: "保存成功"
                });

            }, 500);

            return false;
        }
        if (!!nextProps.task) {
            this.setState({
                openTask: nextProps.openTask,
                data: {taskName: nextProps.task.taskName, taskContent: nextProps.task.taskContent}
            });
        }

    }

    handleClose = () => {
        /*this.setState({openTask: false})*/
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
            let data = Object.assign({}, this.state.moduleContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                moduleContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.moduleContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                moduleContent:data
            })
        }
    };

    onSubmit = () => {
        /*saveTask(this.state.data);*/
        store.dispatch(closeTaskEdit())
    };

    render() {
        //todo:拿到tempTask，既可以组装修改任务也可以进行移动
        const {classes,taskEditorShow,tempTask} = this.props;
        const statusArray=["方案","开发","联调","提测"];
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
                            <Button color="inherit" onClick={this.onSubmit}>
                                保存
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent className={classes.dialogContainer}>
                        <Grid container spacing={16}>
                            <Grid xs={8} item>
                                {/*<TigerInput
                                    id="outlined-name"
                                    label="任务名称"
                                    value={this.state.data.taskName}
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.taskInput,
                                        },
                                        name:"taskName"
                                    }
                                    }
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.taskLabel,
                                        }
                                    }}
                                    onChange={this.handleInput}
                                />*/}
                                <InputField
                                    InputLabelName="任务名称"
                                    onChange={this.getContent}
                                    nameIn="taskName"
                                    defaultValue={this.state.taskName}

                                />
                            </Grid>
                            <Grid xs={4} item>
                                {/*<TigerInput
                                    id="outlined-name"
                                    label="负责人"
                                    value={this.state.data.taskName}
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.taskInput,
                                        },
                                        name:"taskOwner"
                                    }
                                    }
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.taskLabel,
                                        }
                                    }}
                                />*/}
                                <InputField
                                    InputLabelName="负责人"
                                    onChange={this.getContent}
                                    nameIn="taskOwner"
                                />
                            </Grid>
                            <Grid xs={4} item>
                                <DatePicker nameIn="DemandAcceptTime" InputLabelName="任务开始时间" onDateChange={this.getContent}/>
                            </Grid>
                            <Grid xs={4} item>
                                <DatePicker nameIn="DemandAcceptTime" InputLabelName="任务结束时间" onDateChange={this.getContent}/>
                            </Grid>
                            <Grid xs={4} item>
                                <SingleSelect
                                    onChange={this.getContent}
                                    InputLabelName="任务状态"
                                    nameIn="ModuleStatus"
                                    nameArray={statusArray}
                                    funcArray={[{name:"方案",func:changeStatusToPlan},{name:"开发",func:changeStatusToDev},
                                        {name:"联调",func:changeStatusToJointTrial},{name:"提测",func:changeStatusToJointTest}]}
                                    giveContent={this.state.taskID}
                                />
                            </Grid>
                        </Grid>
                        <Typography className={classes.quillLabel}>开发方案</Typography>
                        {/*<ReactQuill value={this.state.data.taskContent} theme="snow"
                                    className={classes.quillContainer}
                                    onChange={this.handleChange}/>*/}
                                    <EditQuill
                                        classStyle={classes.quillContainer}
                                        onChange={this.getContent}/>

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
    }
};

export default connect(mapStateToProps)(withStyles(styles)(TaskEditor));
