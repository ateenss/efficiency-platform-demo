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
import store from "../../stores";
import {closeOtherMissionDetail,saveOtherEditTask,changeOtherTaskStatus} from "../../actions/BuildMissionAction"
import InputField from "../SelfComponent/InputField"
import EditQuill from "../SelfComponent/EditQuill"
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import DatePicker from "../SelfComponent/DatePicker"
import Grid from '@material-ui/core/Grid';



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
        height:"400px",
        width:"90%"
    },
    quillLabel: {
        fontSize: "16px",
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: "15px"
    },


};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class MissionDetailMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            data: {},
            otherEditContent:{},
            projectList:{}
        }
    }

    componentWillReceiveProps(nextProps, nextStatus) {
        if (nextProps.tempBoardToDetail!=null){
            this.setState({
                otherEditContent:nextProps.tempBoardToDetail
            })
        }
        if (nextProps.initialProjectList!=null){
            this.setState({
                projectList:nextProps.initialProjectList
            })
        }

    }

    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.otherEditContent, {
                [keyNote]: value
            });
            this.setState({
                otherEditContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.otherEditContent, {
                [keyNote]: value
            });
            this.setState({
                otherEditContent:data
            })
        }
    };

    handleClose = () => {
        store.dispatch(closeOtherMissionDetail());
    };

    onSaveOtherTask=()=>{
        saveOtherEditTask(this.state.otherEditContent);
        store.dispatch(closeOtherMissionDetail());
    };



    onStart = () => {
        changeOtherTaskStatus(111,this.state.otherEditContent.taskId);
    };

    onFinish = () => {
        changeOtherTaskStatus(222,this.state.otherEditContent.taskId);
    };

    render() {
        const {classes,detailOtherMissionShow} = this.props;
        let projects = [];
        for(let j in this.state.projectList){
            let unit = this.state.projectList[j];
            if(this.state.otherEditContent.belongProjectId === unit.id){
                projects.push({id : unit.id, label : unit.projectName})
            }
        }
        let projectIdAndNameSelect = [];
        for (let i in this.state.projectList) {

            let member = this.state.projectList[i];

            let ret = {
                id: member.id,
                label: member.projectName,
            };
            projectIdAndNameSelect.push(ret);
        }

        return (

            <div>
                <Dialog  fullScreen open={detailOtherMissionShow} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar} color="default">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="headline" align="center" color="inherit" className={classes.flex}>
                                个人其他任务详情
                            </Typography>
                            <Button color="inherit" onClick={this.onSaveOtherTask}>
                                保存
                            </Button>
                            <Button color="inherit" onClick={this.onStart}>
                                开始任务
                            </Button>
                            <Button color="inherit" onClick={this.onFinish}>
                                完成任务
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Grid container spacing={8} >
                        <Grid item xs={6} className={classes.gridStyle}>
                            <InputField
                                nameIn="taskName"
                                onChange={this.getContent}
                                InputLabelName="任务名称"
                                defaultValue={this.state.otherEditContent.taskName}
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.gridStyle}>
                            <DatePicker
                                nameIn="taskDeadline"
                                InputLabelName="任务截至时间"
                                defaultValue={this.state.otherEditContent.taskDeadline}
                                onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={6} className={classes.gridStyle}>
                            <TrueMuitiSelect
                                data={projectIdAndNameSelect}
                                onChange={this.getContent}
                                nameIn="belongProjectId"
                                label="所属项目"
                                singleSelect
                                defaultValue={projects}
                            />

                        </Grid>
                    </Grid>
                    <Typography className={classes.quillLabel}>任务描述</Typography>
                    <EditQuill
                        classStyle={classes.quillContainer}
                        onChange={this.getContent}
                        nameIn="taskDescription"
                        placeholder="请输入任务描述"
                        defaultValue={this.state.otherEditContent.taskDescription}
                    />

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
        detailOtherMissionShow:state.reducer.buildMission.detailOtherMissionShow,
        tempBoardToDetail:state.reducer.buildMission.tempBoardToDetail,
        addTask:state.reducer.buildMission.addTask,
        initialProjectList:state.reducer.buildMission.initialProjectList,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(MissionDetailMain));
