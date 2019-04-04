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
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import Chip from "@material-ui/core/Chip";
import {editTask} from "../../actions/DemandTasksAction";
import {
    openBuildMission,
    closeBuildMission,
    filterDoUnderWay,
    filterDoFinish,
    filterDoDemandMission,
    filterDoDevMission,
    filterDoOwnMission,
    filterReset,
    init
} from "../../actions/BuildMissionAction"
import MissionDetailMain from "../BuildMission/MissionDetailMain"
import IntegrationPage from "../BuildMission/IntegrationPage"
import GoTestPage from "../BuildMission/DoTestPage";
import OtherMissionPage from "../BuildMission/OtherTaskPage"

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
        position:"absolute",
        right:0
    },
    chip:{
        border:"1px solid #cecece"
    }
});




class TaskBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            value: 0
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

   /* componentWillMount() {
        pullBuildMissionInitial();
        // getDemandTasks();

    }*/



    openMissionPanel=()=>{
        store.dispatch(openBuildMission());
    };


    handleClickClose=()=>{
        store.dispatch(closeBuildMission())
    };

    filterUnderWay=()=>{
        store.dispatch(filterDoUnderWay())
    };

    filterFinish=()=>{
        store.dispatch(filterDoFinish())
    };

    filterDemandMission=()=>{
        store.dispatch(filterDoDemandMission())
    };

    filterDevMission=()=>{
        store.dispatch(filterDoDevMission());
    };

    filterOwnMission=()=>{
        store.dispatch(filterDoOwnMission())
    };

    goBack=()=>{
        store.dispatch(filterReset());
    };

    componentDidMount() {
        init()
    }


    render() {
        const {classes,buildMissionShow,addTask,initialData,filterJudge,finished,unfinished} = this.props;
        /*let taskComponents = addTask.map((prop, key) => {
            return (
                <Task key={prop.taskId} taskNo={prop.taskNo} taskName={prop.taskName} taskStatus={prop.taskStatus}
                      taskType={prop.taskType} editFunc={(e) => {this.handleEdit(e, prop.taskId)}} detailFunc={(e) => {this.handleDetail(e, prop.taskId)}}/>
            )
        });*/
        let tempContent=[];
        if (filterJudge.switch==="1"){
            addTask.map((content,key)=>{
                if(filterJudge.keyArray.indexOf(key)>=0){
                    tempContent.push(content)
                }
            })
        }else{
            tempContent=addTask
        }

        let newTaskComponents=tempContent.map((prop,key)=>{
            return (
                <Task key={key} keyNote={prop.taskId} taskDeadline={prop.taskDeadline} taskName={prop.taskName} taskStatus={prop.taskStatus}
                        taskType={prop.taskType} editFunc={(e) => {this.handleEdit(e, key.toString())}} detailFunc={(e) => {this.handleDetail(e, key.toString())}}/>

            )
        });

        const sideList = (
            <div className={classes.list}>
                <List>
                    {[{text:'进行中',func:this.filterUnderWay}, {text:'已完成',func:this.filterFinish}].map((contennt, index) => (
                        <ListItem button key={index} onClick={contennt.func}>
                            <ListItemIcon >{index % 2 === 0 ? <InboxIcon/> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={contennt.text}  />
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {[{text:'需求任务',func:this.filterDemandMission}, {text:'开发任务',func:this.filterDevMission},{ text:'个人任务',func:this.filterOwnMission}].map((content, index) => (
                        <ListItem button key={index} onClick={content.func}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={content.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={this.goBack}>
                        <ListItemIcon> <MailIcon/></ListItemIcon>
                        <ListItemText primary="重置" />
                    </ListItem>
                </List>
            </div>
        );


        return (

            <Grid container className={classes.root} spacing={0}>

                <Grid item xs={12}>
                    <AppBar className={classes.header} position="static" color="default">
                        <Grid container spacing={16}>
                            <Grid item xs={1}>
                                <Badge className={classes.margin} badgeContent={unfinished} color="secondary">
                                    <Chip label="进行中" className={classes.chip} variant="default"
                                          style={{background: "#FFFFFF", color: "#121212"}}/>
                                </Badge>
                            </Grid>
                            <Grid item xs={1}>
                                <Badge className={classes.margin} badgeContent={finished} color="secondary">
                                    <Chip label="已完成" className={classes.chip} variant="default"
                                          style={{background: "#FFFFFF", color: "#121212"}}/>
                                </Badge>
                            </Grid>
                            <Grid item xs={2}>
                                <Toolbar variant="regular" className={classes.toolbar}>
                                    <Button onClick={this.toggleDrawer('right', true)}>筛选</Button>
                                </Toolbar>
                            </Grid>
                        </Grid>
                    </AppBar>
                </Grid>

                <Grid container spacing={16}>
                        {/*{taskComponents}*/}
                        {newTaskComponents}
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
            </Grid>
        )
    }
}


// 从store里面取数据给组件
const
    mapStateToProps = (state) => {
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
