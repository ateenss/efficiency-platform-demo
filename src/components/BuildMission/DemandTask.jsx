/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import store from '../../stores';
import MoreVertIcon from '@material-ui/icons/MoreHoriz';


import MuiCardHeader from "@material-ui/core/CardHeader";
import SimpleListMenu from "../common/SimpleListMenu";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {
    openTaskEdit,
    openAssignGoTest,
    meetRequirements,
    calPerm,
    judgeDevTaskShowActin
} from "../../actions/BuildMissionAction"
import permProcessor from "../../constants/PermProcessor";
import {Tooltip, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";


const styles = {
    cardTitle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        margin:"0",
        fontSize:"16px"
    },
    cardSubtitle: {
        float: "left"
    },
    cardLink: {
        color: "#484848",
        fontWeight: "400",
        margin: "10px 0 10px 0",
        fontSize:"14px"
    },

    taskCard: {
        margin: "15px",
        boxShadow: "none"
    },
    taskHeader: {
        padding: "10px"
    },
    taskDeadline: {
        padding: "0 10px 10px 10px",
        paddingBottom: "10px !important",
        marginTop:"-10px"
    },
    root: {
        width: "100%"
    },
    actions: {
        display: 'flex',
        padding: "0px"

    },
    boxShadowNone:{
        boxShadow:"none"
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

    componentDidMount() {
    }

    funcOptions=(perm,taskOwner)=>()=>{
        let tempOptions=[{
            name: "编辑",
            func: function (id) {
                store.dispatch(openTaskEdit(id));
                // store.dispatch(calPerm(taskOwner))
            }}];
        let empty=[];
        if (this.props.group==="develop") {

            tempOptions.push({
                name: "进行走查",
                func: function (id) {
                    store.dispatch(openAssignGoTest(id))
                }
            })
        }else if(this.props.group==="goTest"&&this.props.taskStatus===4){
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
        if (this.props.devTaskActionShow||this.props.allActonShow) {
            return tempOptions
        } else {
            tempOptions = [];
            tempOptions.push({
                name: "查看任务",
                func: function (id) {
                    store.dispatch(openTaskEdit(id));
                }
            });
            return tempOptions;
        }
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

    checkPerm=(taskOwner)=>{
        judgeDevTaskShowActin(taskOwner);
        store.dispatch(calPerm(taskOwner));
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid className={classes.root}>
                <Card className={classes.taskCard}>
                    <CardHeader className={classes.taskHeader}

                                title={<Tooltip title={this.props.taskName}><h6 className={classes.cardTitle}>{this.props.taskName}</h6></Tooltip>}
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
                    <Divider/>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Grid container style={{background:"#fbfbfb"}}>
                            <Grid item xs={12} style={{textAlign:"center"}}>
                                <Tooltip title="详情">
                                    <SimpleListMenu icon={<MoreVertIcon style={{fontSize:"20px"}}/>} options={this.funcOptions(this.state.perm,this.props.taskOwner)()}
                                                    id={this.props.group + "-taskId-" + this.props.taskId} openClickAction={this.checkPerm.bind(this,this.props.taskOwner)}/>
                                    {/*<Button size="small">*/}
                                        {/*<DetailIcon style={{fontSize:"16px"}}/>*/}
                                    {/*</Button>*/}
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        demands: state.reducer.task.demands,
        devEditorCanShow : state.reducer.buildMission.devEditorCanShow,
        devTaskActionShow : state.reducer.buildMission.devTaskActionShow,
        allActonShow : state.reducer.buildMission.allActonShow

    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(DemandTask));
