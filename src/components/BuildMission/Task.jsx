/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MuiCardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Green from '@material-ui/core/colors/green';
import Grid from "@material-ui/core/Grid";

import {changeTaskStatus} from "../../actions/DemandTasksAction";
import {editTask} from "../../actions/DemandTasksAction";

import {Link, NavLink} from 'react-router-dom'

import MuiCardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";


import DetailIcon from '@material-ui/icons/CallMadeOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import {
    openGoTestDetail,
    openIntegrationDetail,
    openDevMissionDetail,
    openOtherMissionDetail,
    getDemandTaskDetail,
    getTestCaseListByDemands
} from "../../actions/BuildMissionAction"
import store from "../../stores";
import permProcessor from "../../constants/PermProcessor";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {Divider, Tooltip} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const taskConst = {
    allTaskStatus: {
        "0": "待处理",
        "1": "待处理",
        "2": "完成方案",
        "3": "已评审",
        "4": "已走查",
        "5": "已完成持续集成",
        "6": "已提测",
        "7": "具备持续集成条件",
        "8": "完成",
        "9": "走查",
        "10": "完成上线测试案例"
    },
    allTaskType: {
        "1": "需求开发任务",
        "2": "开发任务",
        "3": "走查任务",
        "4": "个人其他任务",
        "5": "上线检查案例任务"
    }
};

const styles = theme => ({
    taskHeader:{
        padding: "10px 10px 0 10px"
    },
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
        padding: "0px"

    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    taskType: {
        backgroundColor: "#FFFFFF",
        color: "#121212",
        width: "auto",
        borderRadius: "2px",
        position: "absolute",
        right: "0",
        left: "0",
        textAlign: "left",
        top: "0",
        padding: "0 10px",
        fontSize: "14px",
        justifyContent: "left"
    },
    taskStatus: {
        backgroundColor: Green[500],
        fontSize: "14px",
        width: "50px",
        height: "50px",
        position: "absolute",
        right: "5px",
        top: "5px",
    },
    taskCard: {
        position: "relative",
        boxShadow:"none"
    },
    taskContent: {
        // paddingBottom: "0px"
    },
    cardHeaderTitle: {
        fontSize:"14px"
    },
});


const CardHeader = withStyles({
    root:{
        padding:"0px 10px 0px 10px",
        fontSize:"14px"
    },
    action:{
        marginRight:"-10px",
        marginTop:"0"
    }
})(props => <MuiCardHeader {...props} />);


const CardContent = withStyles({
    root:{
        paddingLeft:"10px",
        paddingTop:"5px"
    }
})(props => <MuiCardContent {...props} />);



class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            perm: permProcessor.init('task')
        };
    }



    openDetailPanel = (keyNote, taskType) => {

        switch (taskType) {
            case 3:
                store.dispatch(openGoTestDetail(keyNote));
                return;
            case 1:
                if (permProcessor.bingo('getMyTaskInfo', this.state.perm)) {
                    getDemandTaskDetail(keyNote);
                    return ;
                }
                return;
            case 2:
                store.dispatch(openDevMissionDetail(keyNote));
                return;
            case 4:
                store.dispatch(openOtherMissionDetail(keyNote));
                return;
            case 5:
                getTestCaseListByDemands(keyNote);
                return;
            default:
                return false;
        }
    };

    getPath = (taskType, taskId) =>{

        let path = "#";
        let url = "#";
        switch (taskType) {
            case 3:
                path =  <Button size="small" onClick={this.openDetailPanel.bind(this, taskId, 3)}>
                          <DetailIcon style={{fontSize:"16px"}} />
                        </Button>
                break;
            case 1:
                url = "./taskboard/detail?id=" + taskId;
                path =  <Link to={url}>
                            <Button size="small">
                                <DetailIcon style={{fontSize:"16px"}} />
                            </Button>
                        </Link>
                break;
            // case 2:
            //     store.dispatch(openDevMissionDetail(taskId));
            //     return;
            case 4:
                path =  <Button size="small" onClick={this.openDetailPanel.bind(this, taskId, 4)}>
                            <DetailIcon style={{fontSize:"16px"}} />
                        </Button>
                break;
            case 5:
                url = "./taskboard/testCase?id=" + taskId;
                path =  <Link to={url}>
                            <Button size="small">
                                <DetailIcon style={{fontSize:"16px"}} />
                            </Button>
                        </Link>
                break;
            default:
                url = "#";
                path =  <Link to={url}>
                            <Button size="small">
                                <DetailIcon style={{fontSize:"16px"}} />
                            </Button>
                        </Link>
                break;
        }

        return path;

    };

    changePerson = (keyNote, taskOwner, e) => {
      if(!!this.props.changePerson){
        this.props.changePerson(keyNote, taskOwner);
      }
    };

    render() {

        const {classes, keyNote,  taskType,taskStatusList,taskTypeList, taskOwner} = this.props;
        let ret,x;

        for(x in taskConst.allTaskType){

            if(x === taskType.toString()){
                ret = taskConst.allTaskType[x];
            }

        }

        return (
            <Grid container spacing={0} style={{marginTop :"15px",marginBottom:"15px"}}>
                <Grid xs={1} item></Grid>
                <Grid xs={10} item>
                    <Card className={classes.taskCard}>
                        <CardHeader
                            className={classes.taskHeader}
                            title={
                                <div className={classes.cardHeaderTitle}>
                                    <span>{ret} - {this.props.code}</span>
                                </div>
                            }

                        />
                        <CardContent className={classes.taskContent}>

                            <h4 style={{margin:"0", fontWeight:"400", fontSize:"16px"}}>
                                {this.props.taskName}
                            </h4>
                            <Typography style={{
                                marginTop: "10px",
                                color: "#b94947",
                                fontSize: "12px",
                            }}>{this.props.taskDeadline} 截止</Typography>
                        </CardContent>
                        <Divider/>
                        <CardActions className={classes.actions} disableActionSpacing>
                            <Grid container style={{background:"#fbfbfb"}}>
                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    <Tooltip title="详情">
                                        {this.getPath(taskType,keyNote)}
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    <Tooltip title="更改负责人">
                                        <Button size="small" onClick={this.changePerson.bind(this, keyNote, taskOwner)}>
                                            <PersonIcon style={{fontSize:"16px"}}/>
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid xs={1} item></Grid>
            </Grid>
        );
    }
}


const mapStateToProps = (state) => {
        return {
            demands: state.reducer.task.demands,

        }
    };

// export default (withStyles(styles, {withTheme: true})(Task));
export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(Task));