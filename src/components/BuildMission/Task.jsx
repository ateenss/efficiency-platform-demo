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

import {Link} from 'react-router-dom'

import MuiCardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";


import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/ArrowForward';
import {Typography} from "@material-ui/core";
import {
    openGoTestDetail,
    openIntegrationDetail,
    openDevMissionDetail,
    openOtherMissionDetail,
    getDemandTaskDetail
} from "../../actions/BuildMissionAction"
import store from "../../stores";
import permProcessor from "../../constants/PermProcessor";
import {connect} from "react-redux";


const styles = theme => ({
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
        position: "relative"
    },
    taskContent: {
        // paddingBottom: "0px"
    },
    cardHeaderTitle: {
        fontSize:"16px"
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
        this.btnRef = React.createRef();
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
            default:
                return false;
        }
    };

    render() {

        const {classes, keyNote,  taskType,taskStatusList,taskTypeList} = this.props;
        let ret,x;
        for (x in taskTypeList) {
            if (x===taskType.toString()){
                ret=taskTypeList[x]
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
                                    {/*<span>{this.props.taskType} - {this.props.keyNote}</span>*/}
                                    <span>{ret} - {this.props.keyNote}</span>
                                </div>
                            }
                            action={
                                <IconButton aria-label="详情" taskid="1"
                                            onClick={this.openDetailPanel.bind(this, keyNote, taskType)}>
                                    <ShareIcon/>
                                </IconButton>
                            }

                        />
                        <CardContent className={classes.taskContent}>

                            <h4 style={{margin:"0", fontWeight:"700", fontSize:"16px"}}>
                                {this.props.taskName}
                            </h4>

                        </CardContent>
                        <CardActions className={classes.actions} disableActionSpacing>
                            <Grid container justify="flex-start">

                                <Grid item>
                                    <Typography style={{
                                        marginLeft: "10px",
                                        color: "#b94947",
                                        fontSize: "12px",
                                        marginBottom:"10px"
                                    }}>{this.props.taskDeadline} 截止</Typography>
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
            taskStatusList: state.reducer.buildMission.taskStatusList,
            taskTypeList: state.reducer.buildMission.taskTypeList,

        }
    };

// export default (withStyles(styles, {withTheme: true})(Task));
export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(Task));