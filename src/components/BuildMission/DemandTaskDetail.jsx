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
import MuiCardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import Task from './DemandTask';
import Button from '@material-ui/core/Button';
import {
    openBuildModule,
    doAssignGoTest,
    getDemandTaskPlan, init, openTaskEdit,openTestCaseEditor, getDemandTaskTestCase
} from "../../actions/BuildMissionAction"
import Divider from "@material-ui/core/Divider"
import {connect} from "react-redux";
import BuildPlanShow from "./BuildPlanMain"
import store from '../../stores';
import SimpleListMenu from "../common/SimpleListMenu";
import BuildModuleMain from "./BuildDevTaskMain"
import TaskEditor from "./DevTaskEditor";
import DialogTitle from '@material-ui/core/DialogTitle';
import MultiSelect from "../SelfComponent/MultiSelect";
import Dialog from '@material-ui/core/Dialog';
import GotoTest from "./GoTestPage"


import {
    cardTitle,
    cardSubtitle,
    cardLink
} from "../../assets/jss/material-dashboard-react.jsx";
import TableCell from "../Table/Table";
import {changeTaskStatus, editTask} from "../../actions/DemandTasksAction";
import permProcessor from "../../constants/PermProcessor";
import Typography from "@material-ui/core/Typography";
import MuiExpansionPanel from "../SelfComponent/TrueMuitiSelect";
import TestCaseEditor from "./TestCaseEditor";


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
        color: "#484848",
        fontWeight: "700",
        padding:"10px 0 10px 0",
        margin:"0"

    },
    cardHeaderTitle: {
        margin: "0",
        fontWeight:"700",
        padding:"7px"
    },
    demandHeader: {
    },
    taskCard: {
        // marginBottom: "15px"
    },
    taskStatusGroup:{
        marginBottom:"0"
    },
    taskGroup:{
        // background:"#f5f5f5",

    },
    slideContainer:{
        textAlign:"center"
    },
    demand:{
        marginBottom:"10px",
        boxShadow:"none"
    },
    taskFlow:{
        background:"#111111"
    },
    taskWidth:{
        maxWidth:"18%",
        flexBasis:"18%",
        margin:"0 1% 0 1%",
        background:"#f5f5f5"
    }

};

const CardHeader = withStyles({
    action:{
        marginRight:"0",
        marginTop:"0"
    }
})(props => <MuiCardHeader {...props} />);




class DemandTaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.expanded,
            assignContent:null,
            perm: permProcessor.init('task')
        };
    }


    options=(perm)=>()=>{
        let tempList=this.props.demands.taskDetailList;
        let tempOptions=[{
            name: "编写方案",
            func: function (id) {
                if (permProcessor.bingo('getDemandTaskPlan', perm)) {
                    getDemandTaskPlan(id)
                }
            }
        },{
            name: "新建开发任务",
            func: function (id) {
                store.dispatch(openBuildModule())
            }
        },{

            name:"上线案例",
            func: function(id){
                if (permProcessor.bingo('getDemandTaskPlan', perm)) {
                    getDemandTaskTestCase(id)
                }
            }

        }];
        if(tempList.finish.length===0&&tempList.develop.length===0&&tempList.plan.length===0&&tempList.goTest.length===0&&tempList.integration.length>0){
            tempOptions.push({
                name: "进行持续集成测试",
                func: function (id) {
                    // if (permProcessor.bingo('getDemandTaskPlan', perm)) {
                    //     getDemandTaskPlan(id)
                    // }
                    console.log("进行持续集成测试");
                }
            });
        }
        return tempOptions;
    };


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


    render() {
        const {classes, develop, plan, goTest,integration, demands,assignGoTestShow,finish,editMissionShow,buildModuleShow,buildPlanShow,tempBoardToDetail} = this.props;
        let detailInfo=tempBoardToDetail;
        if (!tempBoardToDetail){
            tempBoardToDetail=""
        }
        return (
            <Card className={classes.demand}>
                <CardHeader className={classes.demandHeader}
                            action={
                                <SimpleListMenu icon={<MoreVertIcon/>} options={this.options(this.state.perm)()} id={demands.taskId}/>
                            }

                            title={
                                <div className={classes.cardHeaderTitle}>
                                    <span>{detailInfo.taskName}</span>
                                    <Chip label={detailInfo.taskStatus} className={classes.chip}/>
                                </div>
                            }
                            subheader={tempBoardToDetail.taskDeadLine}
                >
                </CardHeader>
                {/*<CardActions className={classes.actions} disableActionSpacing>*/}
                            {/*<IconButton*/}
                                {/*className={classnames(classes.expand, {*/}
                                    {/*[classes.expandOpen]: this.state.expanded,*/}
                                {/*})}*/}
                                {/*onClick={this.handleExpandClick}*/}
                                {/*aria-expanded={this.state.expanded}*/}
                                {/*aria-label="Show more"*/}
                            {/*>*/}
                                {/*<ExpandMoreIcon/>*/}
                            {/*</IconButton>*/}
                {/*</CardActions>*/}
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <Grid container spacing={0} className={classes.taskFlowStatus}>
                        <Grid container spacing={0} className={classes.taskStatusGroup}>
                            <Grid item xs={2} sm={12} md={2}  className={classes.taskWidth}><h5 align="center" className={classes.taskStatus}>方案</h5></Grid>
                            <Grid item xs={2} sm={12} md={2}  className={classes.taskWidth}><h5 align="center" className={classes.taskStatus}>开发</h5></Grid>
                            <Grid item xs={2} sm={12} md={2}  className={classes.taskWidth}><h5 align="center" className={classes.taskStatus}>走查</h5></Grid>
                            <Grid item xs={2} sm={12} md={2}  className={classes.taskWidth}><h5 align="center" className={classes.taskStatus}>持续集成</h5></Grid>
                            <Grid item xs={2} sm={12} md={2}  className={classes.taskWidth}><h5 align="center" className={classes.taskStatus}>完成</h5></Grid>
                        </Grid>
                        <Grid container spacing={0} className={classes.taskGroup}>

                            <Grid xs={2} sm={12} md={2} item className={classes.taskWidth}>

                                {!plan ? "" : plan.map((prop, key) => {
                                    return (
                                        <Task taskOwner={prop.taskOwner} group="plan" key={key} taskId={prop.taskId} taskName={prop.taskName} taskDeadline={prop.taskDeadline} taskStatus={prop.taskStatus}/>
                                    );
                                })}


                            </Grid>

                            <Grid xs={2} sm={12} md={2} item className={classes.taskWidth} >

                                {!develop ? "" : develop.map((prop, key) => {
                                    return (
                                        <Task taskOwner={prop.taskOwner} group="develop" key={key} taskId={prop.taskId} taskName={prop.taskName} taskDeadline={prop.taskDeadline} taskStatus={prop.taskStatus}/>
                                    );
                                })}

                            </Grid>

                            <Grid xs={2} sm={12} md={2} item className={classes.taskWidth}>
                                {!goTest ? "" : goTest.map((prop, key) => {
                                    return (
                                        <Task  taskOwner={prop.taskOwner} group="goTest" key={key} taskId={prop.taskId} taskName={prop.taskName} taskDeadline={prop.taskDeadline} taskStatus={prop.taskStatus}/>
                                    );
                                })}

                            </Grid>
                            <Grid xs={2} sm={12} md={2} item className={classes.taskWidth}>
                                {!integration ? "" : integration.map((prop, key) => {
                                    return (
                                        <Task taskOwner={prop.taskOwner} group="integration" key={key} taskId={prop.taskId} taskName={prop.taskName} taskDeadline={prop.taskDeadline} taskStatus={prop.taskStatus}/>
                                    );
                                })}

                            </Grid>
                            <Grid xs={2} sm={12} md={2} item className={classes.taskWidth}>
                                {!finish ? "" : finish.map((prop, key) => {
                                    return (
                                        <Task taskOwner={prop.taskOwner} group="finish" key={key} taskId={prop.taskId} taskName={prop.taskName} taskDeadline={prop.taskDeadline} taskStatus={prop.taskStatus}/>
                                    );
                                })}

                            </Grid>
                        </Grid>
                    </Grid>
                </Collapse>
                <BuildPlanShow
                    open={buildPlanShow}/>
                <BuildModuleMain
                    open={buildModuleShow}
                />
                <TaskEditor />
                <TestCaseEditor/>
                <GotoTest/>
            </Card>

        );
    }
}

// export default withStyles(styles)(DemandTaskDetail);
const mapStateToProps = (state) => {
    return {
        initialData:state.reducer.buildMission.initialData,
        editMissionShow:state.reducer.buildMission.editMissionShow,
        buildPlanShow:state.reducer.buildMission.buildPlanShow,
        addTask:state.reducer.buildMission.addTask,
        buildModuleShow:state.reducer.buildMission.buildModuleShow,
        assignGoTestShow:state.reducer.buildMission.assignGoTestShow,
        demands:state.reducer.buildMission.demands,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(DemandTaskDetail));