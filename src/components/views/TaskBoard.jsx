/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import {connect} from "react-redux";
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid'
import Task from '../BuildMission/Task';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Chip from "@material-ui/core/Chip";
import {editTask} from "../../actions/DemandTasksAction";
import AddIcon from "@material-ui/icons/Add";
import permProcessor from "../../constants/PermProcessor";
import {
    closeBuildMission,
    filterDoDemandMission,
    filterDoOwnMission,
    filterReset,
    init,
    filterDoGoTestMission,
    openNewOtherTask, changeTaskOwner
} from "../../actions/BuildMissionAction"
import MissionDetailMain from "../BuildMission/MissionDetailMain"
import IntegrationPage from "../BuildMission/IntegrationPage"
import GoTestPage from "../BuildMission/DoTestPage";
import OtherMissionPage from "../BuildMission/OtherTaskPage"
import {startLoading} from "../../actions/CommonAction";
import BuildOtherTask from "../BuildMission/BuildOtherTaskMain"
import OtherTaskPage from "../BuildMission/OtherTaskPage"
import TestCaseTask from "../BuildMission/TestCaseTask"
import ChangeTaskOwner from "../BuildMission/ChangeTaskOwner";

const styles = theme => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    header: {
        boxShadow: "none",
        background: "#FFFFFF",
        marginBottom: "15px"
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
        position: "absolute",
        right: 0
    },
    chip: {
        border: "1px solid #cecece"
    },
    taskFlowStatus: {
        padding: "5px 15px 15px 15px"
    },
    taskStatusGroup:{
        // marginBottom:"10px;"
    },
    taskStatus: {
        color: "#484848",
        fontWeight: "400",
        padding:"10px 0 10px 0",
        margin:"0"

    },
    taskWidthStatus:{
        maxWidth:"31%",
        flexBasis:"31%",
        margin:"0 1% 0 1%",
        background:"#f5f5f5",
        marginTop:theme.spacing.unit*2
    },
    taskWidth:{
        maxWidth:"31%",
        flexBasis:"31%",
        margin:"0 1% 0 1%",
        background:"#f5f5f5",
        marginBottom:theme.spacing.unit*2
    },
    taskGroup:{
    },
    newDevButton: {
        boxShadow:"none",
        marginLeft:"15px",
        border:"1px solid #4caf50",
        color:"#4caf50",
        padding:"0 0 0 0",
        minHeight:"15px",
        height:"40px",
        minWidth:"100px",
        width:"100%",
        "&:hover":{
            background:"#4caf50",
            color: "#FFFFFF",
        },

    },
    addIcon:{
        width:"1em",
        height:"1em",
        marginTop: 0,
        marginBottom:0,
        paddingBottom:0,
        paddingTop:0,
    },
    textLabel:{

    }

});


class TaskBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            value: 0,
            perm: permProcessor.init('task')
        };
    }

    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    handleEdit = (e, taskId) => {
        editTask(taskId);

    };

    handleDetail = (e, taskId) => {
        editTask(taskId);

    };

    changePerson = (taskId, ownerId, e) =>{

        let currentUser = localStorage.getItem("currentUser");
        if(currentUser != ownerId){
            return false;
        }

        changeTaskOwner(taskId, ownerId);
        console.log(ownerId);
    };

    handleClickClose = () => {
        store.dispatch(closeBuildMission())
    };


    filterDemandMission = () => {
        store.dispatch(filterDoDemandMission())
    };


    filterTestMission=()=>{
        store.dispatch(filterDoGoTestMission())
    };

    filterOwnMission = () => {
        store.dispatch(filterDoOwnMission())
    };

    goBack = () => {
        store.dispatch(filterReset());
    };

    componentWillMount() {

        startLoading();
    }

    componentDidMount() {
        if (permProcessor.bingo('getDemandTaskDetail', this.state.perm)) {
            init()
        }
    }

    openOtherTask=()=>{
        store.dispatch(openNewOtherTask());
    };


    render() {
        const {classes, addTask,  filterJudge} = this.props;

        let tempContent = [];
        if (filterJudge.switch === "1") {
            addTask.map((content, key) => {
                if (filterJudge.keyArray.indexOf(key) >= 0) {
                    tempContent.push(content)
                }
            })
        } else {
            tempContent = addTask
        }


        let newTaskCnt = 0,inProgressTaskCnt=0,finishTaskCnt=0;


        let newTaskComponents = tempContent.map((prop, key) => {
            let content = "";
            if(prop.taskType!==2){
                if(prop.taskStatus === 1){
                    content = <Task key={key} taskOwner={prop.taskOwner} code={prop.taskCode} keyNote={prop.taskId} taskDeadline={prop.taskDeadline} taskName={prop.taskName} taskStatus={prop.taskStatus} taskType={prop.taskType} editFunc={(e) => {this.handleEdit(e, key.toString())}} detailFunc={(e) => {this.handleDetail(e, key.toString())}}  changePerson={this.changePerson}/>;
                    ++newTaskCnt;
                }
            }

            return content;
        });
        let processingTaskComponents = tempContent.map((prop, key) => {
            let content = "";
            if(prop.taskType!==2){
                if (prop.taskStatus===4&&prop.taskType===1){
                    content = <Task key={key} taskOwner={prop.taskOwner} code={prop.taskCode} keyNote={prop.taskId} taskDeadline={prop.taskDeadline} taskName={prop.taskName} taskStatus={prop.taskStatus} taskType={prop.taskType} editFunc={(e) => {this.handleEdit(e, key.toString())}} detailFunc={(e) => {this.handleDetail(e, key.toString())}} changePerson={this.changePerson}/>;
                    ++inProgressTaskCnt;
                    return content;
                }
                if(prop.taskStatus !== 1 && prop.taskStatus !== 8&&prop.taskStatus !==4){
                    content = <Task key={key} taskOwner={prop.taskOwner} code={prop.taskCode} keyNote={prop.taskId} taskDeadline={prop.taskDeadline} taskName={prop.taskName} taskStatus={prop.taskStatus} taskType={prop.taskType} editFunc={(e) => {this.handleEdit(e, key.toString())}} detailFunc={(e) => {this.handleDetail(e, key.toString())}} changePerson={this.changePerson}/>;
                    ++inProgressTaskCnt;
                }

            }

            return content;
        });
        let finishTaskComponents = tempContent.map((prop, key) => {
            let content = "";
            if(prop.taskType!==2){
                if(prop.taskStatus === 8||(prop.taskStatus === 4&&prop.taskType!==1)){
                    content = <Task key={key} code={prop.taskCode} keyNote={prop.taskId} taskDeadline={prop.taskDeadline} taskName={prop.taskName} taskStatus={prop.taskStatus} taskType={prop.taskType} editFunc={(e) => {this.handleEdit(e, key.toString())}} detailFunc={(e) => {this.handleDetail(e, key.toString())}}/>;
                    ++finishTaskCnt;
                }
            }
            return content;
        });

        const sideList = (
            <div className={classes.list}>
                <List>
                    {[{text: '需求任务', func: this.filterDemandMission},
                        {text: '个人任务', func: this.filterOwnMission},
                        {text:'走查任务',func:this.filterTestMission}].map((content, index) => (
                        <ListItem button key={index} onClick={content.func}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={content.text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={this.goBack}>
                        <ListItemIcon> <MailIcon/></ListItemIcon>
                        <ListItemText primary="重置"/>
                    </ListItem>
                </List>
            </div>
        );




        return (

            <Grid container className={classes.root} spacing={0}>

                <Grid item xs={12}>
                    <AppBar className={classes.header} position="static" color="default">
                        <Grid container spacing={16}>

                            <Grid item xs={2}>
                                <Toolbar variant="regular">
                                    {/*<Button onClick={this.toggleDrawer('right', true)}*/}
                                            {/*className={classes.newDevButton}*/}
                                            {/*size="large"*/}
                                    {/*>筛选</Button>*/}
                                   {/* <Button onClick={this.openOtherTask}
                                            className={classes.newDevButton}
                                            size="large"
                                            fullWidth={true}
                                    >*/}
                                    <Button onClick={this.openOtherTask}
                                            classes={{root:classes.newDevButton,
                                            label:classes.textLabel}}
                                            size="large"
                                            fullWidth={true}
                                    >
                                        <AddIcon className={classes.addIcon}/>
                                        个人任务
                                    </Button>

                                </Toolbar>
                            </Grid>
                        </Grid>
                    </AppBar>
                </Grid>

                <Grid container spacing={0} style={{background:"#FFFFFF", paddingBottom:"15px"}}>
                    <Grid container spacing={0} className={classes.taskStatusGroup}>
                        <Grid item xs={4} sm={12} md={4} className={classes.taskWidthStatus}>
                                <h5 align="center" className={classes.taskStatus}>待处理 <Chip label={newTaskCnt} style={{width:"20px",height:"20px"}}></Chip></h5>
                        </Grid>
                        <Grid item xs={4} sm={12} md={4} className={classes.taskWidthStatus}><h5 align="center" className={classes.taskStatus}>进行中 <Chip label={inProgressTaskCnt} style={{width:"20px",height:"20px"}}></Chip></h5></Grid>
                        <Grid item xs={4} sm={12} md={4} className={classes.taskWidthStatus}><h5 align="center" className={classes.taskStatus}>已完成 <Chip label={finishTaskCnt} style={{width:"20px",height:"20px"}}></Chip></h5></Grid>
                    </Grid>
                    <Grid container spacing={0} className={classes.taskGroup}>

                        <Grid xs={4} sm={12} md={4} item className={classes.taskWidth}>
                            {newTaskComponents}
                        </Grid>
                        <Grid xs={4} sm={12} md={4} item className={classes.taskWidth}>
                            {processingTaskComponents}
                        </Grid>
                        <Grid xs={4} sm={12} md={4} item className={classes.taskWidth}>
                            {finishTaskComponents}
                        </Grid>
                    </Grid>

                </Grid>
                <div>

                    <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('right', false)}
                            onKeyDown={this.toggleDrawer('right', false)}
                        >
                            {sideList}
                        </div>
                    </Drawer>
                </div>
                <MissionDetailMain/>
                <IntegrationPage/>
                <GoTestPage/>
                <OtherMissionPage/>
                <BuildOtherTask/>
                <OtherTaskPage/>
                <TestCaseTask/>
                <ChangeTaskOwner/>
            </Grid>
        )
    }
}


// 从store里面取数据给组件
const
    mapStateToProps = (state) => {
    console.log("(*&(*&(*&(*&"+JSON.stringify(state.reducer.buildMission.addTask))
        return {
            demands: state.reducer.task.demands,
            buildMissionShow: state.reducer.buildMission.buildMissionShow,
            editMissionShow: state.reducer.buildMission.editMissionShow,
            addTask: state.reducer.buildMission.addTask,
            initialData: state.reducer.buildMission.initialData,
            filterJudge: state.reducer.buildMission.filterJudge,
            finished: state.reducer.buildMission.finished,
            unfinished: state.reducer.buildMission.unfinished
        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        TaskBoard
    ))
;
