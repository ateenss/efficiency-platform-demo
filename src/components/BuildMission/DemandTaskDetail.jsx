/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import Grid from "@material-ui/core/Grid";
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import Task from './DemandTask';
import Button from '@material-ui/core/Button';
import {openEditMission,openBuildPlan,openBuildModule,closeBuildModule,closeAssignGoTest,doAssignGoTest} from "../../actions/BuildMissionAction"
import Divider from "@material-ui/core/Divider"
import {connect} from "react-redux";
import EditMissionMain from "./EditMissionMain"
import BuildPlanShow from "./BuildPlanMain"
import store from '../../stores';
import SimpleListMenu from "../common/SimpleListMenu";
import BuildModuleMain from "../BuildMission/BuildModuleMain"
import TaskEditor from "./TaskEditor";
import DialogTitle from '@material-ui/core/DialogTitle';
import MultiSelect from "../SelfComponent/MultiSelect";
import Dialog from '@material-ui/core/Dialog';
import GotoTest from "./GotoTest"


import {
    cardTitle,
    cardSubtitle,
    cardLink
} from "../../assets/jss/material-dashboard-react.jsx";
import TableCell from "../Table/Table";
import {changeTaskStatus, editTask} from "../../actions/DemandTasksAction";


const styles = {
    cardTitle,
    actions:{
      padding:0
    },
    cardSubtitle: {
        float: "left"
    },
    cardLink,
    DemandHeader: {
        margin: "0px !important",

    },
    expand: {padding: "0",width:"100%"},
    cardTitleWhite: {
        margin: 0,
        float: "left"
    },
    taskFlowStatus: {
        padding: "5px 15px 15px 15px"
    },
    chips: {
        padding: "0",
        textAlign: "center"


    },
    chip: {
        float: "right",
        background: "#4caf50",
        color: "#FFFFFF"
    },
    taskStatus: {
        margin: "5px 0",
        color: "#4caf50",
        fontWeight: "700",

    },
    cardHeaderTitle: {
        margin: "0",
        fontWeight:"700"
    },
    demandHeader: {
        paddingBottom: "0"
    },
    taskCard: {
        // marginBottom: "15px"
    },
    taskStatusGroup:{
        background:"#f5f5f5",
        marginBottom:"10px;"
    },
    taskGroup:{
        background:"#f5f5f5",
    },
    slideContainer:{
        textAlign:"center"
    },
    demand:{
        marginBottom:"10px"
    },
    taskFlow:{
        background:"#111111"
    }

};

const options = [
        {
            name: "编写方案",
            func: function (id) {
                store.dispatch(openBuildPlan())

            }
        },
        {
            name: "编辑需求",
            func: function (id) {
                store.dispatch(openEditMission())
            }
        },
        {
            name: "新建模块",
            func: function (id) {
                store.dispatch(openBuildModule())
            }
        }

    ]
;

//这里是打开指定走查人
const AssignGoTest=(props)=>{
    const nameArray=["员工A","员工B","员工C","员工D","员工E","员工F","员工G","员工H"];
    return(
        <Dialog  onClose={()=>store.dispatch(closeAssignGoTest())} aria-labelledby="simple-dialog-title" open={props.openAssign}>
            <DialogTitle id="simple-dialog-title">走查状态变化</DialogTitle>
            <div>
                <MultiSelect
                    nameArray={nameArray}
                    onChange={props.getContent}
                    InputLabelName="指定走查人"
                    nameIn="goTestMan"
                />
                <Button onClick={props.openAssignGoTest}>开始走查</Button>
            </div>
        </Dialog>
    )
};

class DemandTaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.expanded,
            assignContent:null
        };
    }

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };
    openAssignGoTest=()=>{
        store.dispatch(doAssignGoTest(this.state.assignContent.goTestMan));
        /*store.dispatch(closeAssignGoTest())*/
    };

    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.assignContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                assignContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.assignContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                assignContent:data
            })
        }
        console.log(this.state.assignContent);

    };

   /* openEditMission=()=>{
        store.dispatch(openEditMission())
    };

    openPlan=()=>{
        store.dispatch(openBuildPlan())
    };*/

    render() {
        const {classes, develop, plan, goTest,integration, assignGoTestShow,finish,editMissionShow,buildModuleShow,buildPlanShow,tempBoardToDetail} = this.props;

        return (
            <Card className={classes.demand}>
                <CardHeader className={classes.demandHeader}
                            action={
                                <SimpleListMenu icon={<MoreVertIcon/>} options={options}/>
                            }

                            title={
                                <div className={classes.cardHeaderTitle}><span>{tempBoardToDetail.taskName}</span>
                                    <Chip label={tempBoardToDetail.taskStatus} className={classes.chip}/>
                                </div>
                            }
                            subheader={tempBoardToDetail.taskDeadLine}
                >
                </CardHeader>
                <CardActions className={classes.actions} disableActionSpacing>
                            <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                            >
                                <ExpandMoreIcon/>
                            </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <Grid container spacing={0} className={classes.taskFlowStatus}>
                        <Grid container spacing={0} className={classes.taskStatusGroup}>
                            <Grid item xs={2} sm={12} md={2}><h5 align="center" className={classes.taskStatus}>方案</h5></Grid>
                            <Grid item xs={2} sm={12} md={2}><h5 align="center" className={classes.taskStatus}>开发</h5></Grid>
                            <Grid item xs={2} sm={12} md={2}><h5 align="center" className={classes.taskStatus}>走查</h5></Grid>
                            <Grid item xs={2} sm={12} md={2}><h5 align="center" className={classes.taskStatus}>持续集成</h5></Grid>
                            <Grid item xs={2} sm={12} md={2}><h5 align="center" className={classes.taskStatus}>完成</h5></Grid>
                        </Grid>
                        <Grid container spacing={0} className={classes.taskGroup}>
                            <Grid xs={2} sm={12} md={2} item>

                                {!plan ? "" : plan.map((prop, key) => {
                                    return (
                                        <Task group="plan" key={key} taskId={prop.taskCode} taskName={prop.taskName} taskDeadline={prop.taskDeadline} taskStatus={prop.taskStatus}/>
                                    );
                                })}


                            </Grid>

                            <Grid xs={2} sm={12} md={2} item>

                                {!develop ? "" : develop.map((prop, key) => {
                                    return (
                                        <Task group="develop" key={key} taskId={prop.taskCode} taskName={prop.taskName} taskDeadline={prop.taskDeadline} taskStatus={prop.taskStatus}/>
                                    );
                                })}

                            </Grid>

                            <Grid xs={2} sm={12} md={2} item>
                                {console.log(goTest)}
                                {!goTest ? "" : goTest.map((prop, key) => {
                                    return (
                                        <Task  group="goTest" key={key} taskId={prop.taskCode} taskName={prop.taskName} taskDeadline={prop.taskDeadline} taskStatus={prop.taskStatus}/>
                                    );
                                })}

                            </Grid>
                            <Grid xs={2} sm={12} md={2} item>
                                {!integration ? "" : integration.map((prop, key) => {
                                    return (
                                        <Task group="integration" key={key} taskId={prop.taskCode} taskName={prop.taskName} taskDeadline={prop.taskDeadline} taskStatus={prop.taskStatus}/>
                                    );
                                })}

                            </Grid>
                            <Grid xs={2} sm={12} md={2} item>
                                {!finish ? "" : finish.map((prop, key) => {
                                    return (
                                        <Task group="finish" key={key} taskId={prop.taskCode} taskName={prop.taskName} taskDeadline={prop.taskDeadline} taskStatus={prop.taskStatus}/>
                                    );
                                })}

                            </Grid>
                        </Grid>
                    </Grid>
                </Collapse>
                <EditMissionMain
                    open={editMissionShow}
                    tempBoardToDetail={tempBoardToDetail}
                />
                <BuildPlanShow
                    open={buildPlanShow}/>
                <BuildModuleMain
                    open={buildModuleShow}
                />
                <TaskEditor />
                {/*<AssignGoTest
                    openAssign={assignGoTestShow}
                    openAssignGoTest={this.openAssignGoTest}
                    getContent={this.getContent}/>*/}
                <GotoTest/>
            </Card>

        );
    }
}

// export default withStyles(styles)(DemandTaskDetail);
const mapStateToProps = (state) => {
    // console.log("map数据:"+state.reducer.buildProject.addProjects);
    return {
        initialData:state.reducer.buildMission.initialData,
        editMissionShow:state.reducer.buildMission.editMissionShow,
        buildPlanShow:state.reducer.buildMission.buildPlanShow,
        addTask:state.reducer.buildMission.addTask,
        buildModuleShow:state.reducer.buildMission.buildModuleShow,
        assignGoTestShow:state.reducer.buildMission.assignGoTestShow,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(DemandTaskDetail));