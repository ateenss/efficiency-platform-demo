/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import store from '../../stores';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from "@material-ui/core/Divider"
import {
    cardTitle,
    cardSubtitle,
    cardLink
} from "../../assets/jss/material-dashboard-react.jsx";
import {changeTaskStatus} from "../../actions/DemandTasksAction";
import {editTask} from "../../actions/DemandTasksAction";


import MuiCardHeader from "@material-ui/core/CardHeader";
import SimpleListMenu from "../common/SimpleListMenu";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {
    openTaskEdit,
    openAssignGoTest,
    meetRequirements,
    calPerm
} from "../../actions/BuildMissionAction"
import permProcessor from "../../constants/PermProcessor";
import {Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';


const styles = {
    cardTitle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        margin:"0",
        fontSize:"22px"
    },
    cardSubtitle: {
        float: "left"
    },
    cardLink: {
        color: "#484848",
        fontWeight: "700",
        margin: "15px 0 15px 0"
    },

    taskCard: {
        margin: "15px"
    },
    taskHeader: {
        padding: "10px 15px 0 15px"
    },
    taskDeadline: {
        padding: "0 15px 15px 15px",
        paddingBottom: "10px !important",
        marginTop:"-10px"
    },
    root: {
        width: "100%"
    }


};



const CardHeader = withStyles({
    action:{
        marginRight:"-15px",
        marginTop:"0"
    },
    content:{
        width:"85%"

    }
})(props => <MuiCardHeader {...props} />);



class DemandTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            perm: permProcessor.init('task')
        };
    }
    funcOptions=(perm,taskOwner)=>()=>{
        let tempOptions=[{
            name: "编辑",
            func: function (id) {
                store.dispatch(openTaskEdit(id));
                store.dispatch(calPerm(taskOwner))
            }
        }];
        if (this.props.group==="develop") {

            tempOptions.push({
                name: "进行走查",
                func: function (id) {
                    store.dispatch(openAssignGoTest(id))
                }
            })
        }else if(this.props.group==="goTest"&&this.props.taskStatus==="已走查"){
            tempOptions.push({
                name: "具备集成测试条件",
                func: function (id) {
                    if (permProcessor.bingo('meetRequirements', perm)) {
                        meetRequirements(id)
                    }
                    meetRequirements(id)
                }
            })
        }else if(this.props.group==="finish"){
            tempOptions.push({
                name: "完成并删除任务",
                func: function (id) {
                    store.dispatch(openTaskEdit(id))
                }
            })
        }

        return tempOptions
    };

    idMap2Name=()=>{
        let members=this.props.projectMembers;
        let idNumber=this.props.taskOwner;
        let nameString="";
        members.map((item,index)=>{
            item.id===idNumber&&(nameString=item.name)
        });
        return nameString
    };

    moduleId2Name=()=>{
        let tempModules=this.props.modules;
        let moduleId=this.props.involveModule;
        let ret="";
        tempModules.map((item,index)=>{
            item.id===moduleId&&(ret=item.label)
        });
        return ret;
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid className={classes.root}>
                <Card className={classes.taskCard}>
                    <CardHeader className={classes.taskHeader}
                                action={
                                    <SimpleListMenu icon={<MoreVertIcon/>} options={this.funcOptions(this.state.perm,this.props.taskOwner)()}
                                                    id={this.props.group + "-taskId-" + this.props.taskId}/>
                                }
                                title={<h6 className={classes.cardTitle}>{this.props.taskName}</h6>}
                    />
                    <CardContent className={classes.taskDeadline}>

                        <p href="#pablo" className={classes.cardLink}
                           onClick={e => e.preventDefault()}>{this.idMap2Name()}</p>

                        <p href="#pablo" className={classes.cardLink}
                           onClick={e => e.preventDefault()}>{this.moduleId2Name()}</p>

                        <Typography style={{
                            marginLeft: "0",
                            color: "#b94947",
                            fontSize: "12px"
                        }}>{this.props.taskDeadline} 截止</Typography>

                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        demands: state.reducer.task.demands,
        projectMembers: state.reducer.common.projectMembers,
        modules : state.reducer.buildMission.modules
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(DemandTask));
