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


import CardHeader from "@material-ui/core/CardHeader";
import SimpleListMenu from "../common/SimpleListMenu";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {
    openTaskEdit,
    openAssignGoTest,
   meetRequirements,
} from "../../actions/BuildMissionAction"
import permProcessor from "../../constants/PermProcessor";


const styles = {
    cardTitle,
    cardSubtitle: {
        float: "left"
    },
    cardLink:{
      color:"#4caf50",
        fontWeight:"700",
        margin:"0"
    },

    taskCard: {
        margin: "15px"
    },
    taskHeader:{
        padding:"10px 15px 0 15px",
    },
    taskDeadline:{
        padding:"0 15px 10px 15px",
        paddingBottom:"15px !important"
    },
    root:{
        width:"100%"
    }


};



class DemandTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            perm: permProcessor.init('task')
        };
    }
    funcOptions=(perm)=>()=>{
        let tempOptions=[{
            name: "编辑",
            func: function (id) {
                store.dispatch(openTaskEdit(id))
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

    render() {
        const {classes} = this.props;
        return (
            <Grid className={classes.root}>
            <Card className={classes.taskCard}>
                <CardHeader className={classes.taskHeader}
                            action={
                                <SimpleListMenu icon={<MoreVertIcon/>} options={this.funcOptions(this.state.perm)()}
                                                id={this.props.group+"-taskId-" + this.props.taskId}/>
                            }
                            title={<h6 className={classes.cardTitle}>{this.props.taskName}</h6>}
                />
                <CardContent className={classes.taskDeadline}>

                    <Divider/>
                    <p>
                        {this.props.taskDeadline}
                    </p>

                    <p href="#pablo" className={classes.cardLink}
                       onClick={e => e.preventDefault()}>{this.idMap2Name()}</p>
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
        projectMembers: state.reducer.common.projectMembers
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(DemandTask));
