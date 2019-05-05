import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import MultiLineInput from "../SelfComponent/MultiLineInput"
import {getDevelopPlan, getModuleInfo} from "../../actions/IterationAction";
import {GET_DEVELOP_PLAN, GET_DEVPLAN_DETAIL} from "../../actions/types";
import classNames from 'classnames';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Avatar, Tooltip} from "@material-ui/core";
import MyQuill from "../SelfComponent/MyQuill";
//
// import FilterIcon_1 from '@material-ui/icons/Filter1';
// import FilterIcon_2 from '@material-ui/icons/Filter2';
// import FilterIcon_3 from '@material-ui/icons/Filter3';
// import FilterIcon_4 from '@material-ui/icons/Filter4';
// import FilterIcon_5 from '@material-ui/icons/Filter5';
// import FilterIcon_6 from '@material-ui/icons/Filter6';
// import FilterIcon_7 from '@material-ui/icons/Filter7';
// import FilterIcon_8 from '@material-ui/icons/Filter8';
//


const drawerWidth = 200;


const styles = theme => ({

    flex: {
        flex: 1,
    },
    RightWrapper: {
        position: "relative",
        // marginTtop:"px",
        height: "900px",
        marginTop: "10px",
        marginBottom: "10px",
        marginRight: "0px",
    },
    quillWrapper: {
        // marginLeft: "8px",
        marginTop: theme.spacing.unit,
        // marginRight: "8px",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        height: "563px"
    },
    quillIn: {
        height: "500px"
    },
    LeftBottom: {
        position: "relative",
        top: "80px",
        left: "12px"
    },
    title: {
        paddingTop: "5px",
        paddingBottom: "10px",
        fontSize: "19px",
        fontWeight: "20",
        align: "center"
    },
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow:"none",
        borderBottom:"1px solid #e0e0e0"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        top:"50px",
        background:"#f5f5f5"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        top:"50px",
        background:"#f5f5f5"

    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
        top:"50px",
        background:"#f5f5f5"

    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 1,
    },
    noneBorder:{
        borderRight:"none"
    },
    hideMore:{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    planAvatar:{
        width:"24px",
        height:"24px",
        fontSize:"14px",
        background:"#4DAF7C",
        color:"#FFF"
    }

});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class DevelopPlan extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
            planContent:this.props.content,
            moduleList:this.props.moduleList,
            taskIdList:this.props.taskIdList,
            tabValue: 0,
            showValue:0,
            devPlanContent:"",
            currentTaskId : 0,
        };
    }




    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.action===GET_DEVPLAN_DETAIL){
            this.setState({
                showValue:nextProps.devPlanContent.taskId
            });
            this.setState({
                devPlanContent:nextProps.devPlanContent.planContent, currentTaskId:nextProps.devPlanContent.taskId
            })


        }
        if (nextProps.action===GET_DEVELOP_PLAN) {
            this.setState({
                planContent:nextProps.content, currentTaskId : 0
            })
        }
    }


    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: !this.state.open });
    };
    getContent = e => {
        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.planContent, {
                [keyNote]: value
            });
            this.setState({
                planContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.planContent, {
                [keyNote]: value
            });
            this.setState({
                planContent: data
            })
        }
    };

    change2Module=(taskId)=>{

        getModuleInfo(taskId);
    };

    change2DemandTask=()=>{
        getDevelopPlan(this.props.wantKey);
        this.setState({
            showValue:0
        });
    };

    demandTaskLabel=()=>{return (
        <ListItem button onClick={this.change2DemandTask} dense divider={false} >
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="需求任务方案" />
        </ListItem>
    )};

    render() {
        const {classes, content, theme} = this.props;
        let planContent="";
        !!this.state.planContent&&(planContent=this.state.planContent);
        return (
            <div className={classes.root}>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                        paperAnchorLeft : classNames({
                            [classes.noneBorder] : this.state.open,
                        [classes.noneBorder] : !this.state.open,
                        }),
                        paperAnchorDockedLeft: classes.noneBorder
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <List>
                        <ListItem button onClick={this.change2DemandTask} dense divider={false} selected={!this.state.currentTaskId || this.state.currentTaskId === 0 ? true : false}>
                            <ListItemIcon><Avatar className={classes.planAvatar}>总</Avatar></ListItemIcon>
                            <ListItemText primary="需求任务方案" disableTypography={true}  />
                        </ListItem>
                        {this.state.moduleList.map((text, index) => {
                            let showName="";
                            let tooltipName = "";
                            let selected = false;
                            if (this.props.modules!=null){
                                for(let i=0;i<this.props.modules.length;i++){
                                    if (this.props.modules[i].id===text.moduleName) {
                                        showName=this.props.modules[i].label.split("(")[0];
                                        tooltipName=this.props.modules[i].label;
                                    }
                                }
                            }
                            if(text.taskId === this.state.currentTaskId){
                                selected = true;
                            }

                            return (
                                <Tooltip title={tooltipName} placement="right-end">

                                    <ListItem button onClick={this.change2Module.bind(this,text.taskId)} key={index} dense divider={false} selected={selected}>
                                        <ListItemIcon><Avatar className={classes.planAvatar}>{++index}</Avatar></ListItemIcon>
                                        <ListItemText primary={showName} disableTypography={true} className={classes.hideMore}/>
                                    </ListItem>
                                </Tooltip>

                            )}
                        )}

                    </List>
                </Drawer>
                <main className={classes.content}>
                    {/*{this.state.showValue===0&&demandplan(classes,planContent,this.getContent)}*/}
                    {this.state.showValue===0&&(
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <Grid container spacing={8}>
                                    <Grid item xs={12} className={classes.quillWrapper}>
                                        <MyQuill
                                            nameIn="overallPlan"
                                            placeholder="请输入整体方案描述"
                                            onChange={this.getContent}
                                            defaultValue={planContent.overallPlan}
                                            readOnly={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="外部系统接口调整"
                                                        nameIn="outerSysInterfaceChange"
                                                        onChange={this.getContent}
                                                        defaultValue={planContent.outerSysInterfaceChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="是否支持灰度功能"
                                                        nameIn="supportGrayEnv"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.supportGrayEnv}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="灾备影响性评估"
                                                        nameIn="disasterRecoveryAssessment"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.disasterRecoveryAssessment}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="生产影响性评估"
                                                        nameIn="productEnvAssessment"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.productEnvAssessment}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={8}>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="外部系统配套改造"
                                                        nameIn="outerSysChange"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.outerSysChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="模块上线顺序要求"
                                                        nameIn="moduleDeploySequence"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.moduleDeploySequence}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="内部子系统间接口调整"
                                                        nameIn="innerSysInterfaceChange"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.innerSysInterfaceChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="安全相关"
                                                        nameIn="safety"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.safety}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="数据库修改点"
                                                        nameIn="dbChange"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.dbChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="参数配置要求"
                                                        nameIn="config"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.config}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="接口规范变更"
                                                        nameIn="interfaceChange"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.interfaceChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="运维信息变更"
                                                        nameIn="operationChange"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.operationChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="部署需求调整"
                                                        nameIn="deploymentChange"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.deploymentChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="五高影响性"
                                                        nameIn="high5Assessment"
                                                        onChange={this.getContent}
                                                        content={content}
                                                        defaultValue={planContent.high5Assessment}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {
                        this.state.moduleList.map((text, index) => {
                            return (
                                this.state.showValue===text.taskId && (
                                    <Grid container spacing={8}>
                                        <Grid item xs={12} className={classes.quillWrapper}>
                                            <MyQuill
                                                nameIn="overallPlan"
                                                placeholder="请输入整体方案描述"
                                                onChange={this.getContent}
                                                defaultValue={this.state.devPlanContent}
                                                readOnly={true}
                                            />
                                        </Grid>
                                    </Grid>
                                ))

                            })
                    }






                </main>
            </div>




        );
    }
}

DevelopPlan.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        developPlan: state.reducer.iteration.developPlan,
        action: state.reducer.iteration.action,
        moduleList: state.reducer.iteration.moduleList,
        taskIdList: state.reducer.iteration.taskIdList,
        devPlanContent: state.reducer.iteration.devPlanContent,
        wantKey: state.reducer.iteration.wantKey,
        modules:state.reducer.buildMission.modules,
    }
};
// export default withStyles(styles,{withTheme: true})(DevelopPlan);
export default connect(mapStateToProps)(withStyles(styles,{withTheme: true})(DevelopPlan));