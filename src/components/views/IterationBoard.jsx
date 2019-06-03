import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import IterationList from "../Iteration/IterationList";
import {Paper} from "@material-ui/core";
import {connect} from "react-redux";
import {
    selectIteration,
    addIteration,
    deleteIteration,
    updatePersonInfo, getRecentIteration
} from "../../actions/IterationAction";
import AddIteration from "../Iteration/AddIteration";

import {
    CLOSE_ITERATION_FILTER,
    DELETE_ITERATION,
    OPEN_ITERATION_FILTER,
    SAVE_ADD_ITERATION, SAVE_EDIT_ITERATION
} from "../../actions/types";
import DemandsList from "../Iteration/DemandsList";
import ShowDevelopPlan from "../Iteration/ShowDevDocuments";
import ShowPublishDocument from "../Iteration/ShowPublishDocument";
import IterationStepper from "../Iteration/IterationStepper";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import {startLoading, stopLoading, sysInit} from "../../actions/CommonAction";
import permProcessor from "../../constants/PermProcessor";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import IterationTable from "../Iteration/IterationTable";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Edit"
import LinkIcon from "@material-ui/icons/Link"

import UpdatePersonInfo from "../Iteration/UpdatePersonInfo";
import Tooltip from "@material-ui/core/Tooltip";
import DemandIterationStepper from "../demand/DemandIterationStepper";
import Stats from "../Iteration/Stats";
import {error} from "../../actions/NotificationAction";

const styles = theme => ({
    root: {
        width: '100%'
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: "50px"
    },
    toolbarHead: {
        backgroundColor: "#FFFFFF",
        boxShadow: "none"
    },
    textInfo: {
        margin: theme.spacing.unit * 1,
        color: "#121212",
        fontSize: "14px",
        fontWeight: "400"
    },
    avatar: {
        backgroundColor: "#4DAF7C",
        width: "32px",
        height: "32px"
    },
    cardHeader: {
        padding: theme.spacing.unit,
    },
    cardContent: {
        padding: theme.spacing.unit,

    },
    card: {
        boxShadow: "0px 0px 1px 0px #e0e0e0, 0px 0px 1px 0px #e0e0e0, 0px 0px 1px 0px #e0e0e0",
        margin: theme.spacing.unit
    },
    hide: {
        display: "none"
    },
    editIcon: {
        marginRight: "15px"
    },
    chipStyle: {
        // background: "#f5f5f5",
        // color: "#232323",
        margin: "5px",
        fontSize: "14px",
        borderRadius: "3px",
        minWidth:"68px",
        background:"#f5f5f5"
    },
    tabsIndicator: {
        backgroundColor: '#4DAF7C',

    },
    toolTipIteration:{
        background:"#F5F5F5", padding:"8px",maxWidth:"600px"
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class IterationBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            iterationInfo: {},
            tabValue: 0,
            hide: true,
            perm: permProcessor.init('iteration'),
            openAlert:false,
            currentIteration : "",
            allVersionSelected : false,
            projectMembers:[],
            modules:[]
        };
    }


    handleChange = (event, value) => {
        this.setState({tabValue: value});
    };

    handleSearch = (val) => {
        console.log("search iteration" + val);
        selectIteration(val);
        this.deSelect();
    };

    handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("add iteration");
        addIteration();

    };
    handleEdit = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        addIteration(id);
        console.log("edit iteration" + id);

    };


    handleAlertDelete = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({openAlert:true, currentIteration:id})
    };

    handleIterationDelete= () =>{

        let iterationId = this.state.currentIteration;

        deleteIteration(iterationId);

    };




    handleSelected = (id) => {

        startLoading();

        // dispatch一个ID过去，获取该版本下的所有需求，然后选中
        selectIteration(id, function(){

            stopLoading();

        });
        this.setState({allVersionSelected : false})
    };

    deSelect = () => {
        let iterationState = this.state.iterationState;
        for (let i in iterationState) {
            let iter = iterationState[i];
            for (let j in iter.children) {
                iter.children[j].selected = false;
            }
        }
        this.setState({iterationState : iterationState})
    };

    handleMultiSelect = (id) => {
        // openMultiSelect(id);
    };


    handleDialogClose = () =>{
        this.setState({openAlert:false, currentIteration:""})
    }

    handleUpdatePersonInfo= (id ,e) =>{

        if(!id){
            return false;
        }

        updatePersonInfo(id);

    };

    componentWillMount() {

        startLoading();
    }

    componentDidMount() {

        let self = this;

        sysInit(function(initParams){

            getRecentIteration().then(resp => {

                let group = [];
                for (let i in resp.data.data) {
                    let unit = resp.data.data[i];

                    let unitChild = {id: unit.id, name : unit.iterationCode};

                    let inGroup = false;

                    for(let j in group){

                        if(unit.group === group[j].iteration){
                            inGroup = true;
                            group[j].children.push(unitChild);
                        }

                    }

                    if(!inGroup){
                        let newUnit = {
                            iteration : unit.group,
                            children : []
                        };
                        newUnit.children.push(unitChild);
                        group.push(newUnit);
                    }

                }

                let iterationState = [];

                let selectId = "";
                for (let i in group) {
                    let iter = group[i];

                    let parent = {};
                    let iterationChildren = [];
                    for (let j in iter.children) {
                        let selected = false;
                        if (i == 0 && j == 0) {
                            selected = true;
                            selectId = iter.children[j].id;
                        }
                        iterationChildren.push({iter: iter.children[j].name, selected: selected, id: iter.children[j].id});

                    }

                    parent.children = iterationChildren;
                    parent.iteration = {name: iter.iteration, selected: false};
                    iterationState.push(parent);
                }

                self.setState({iterationState: iterationState, projectMembers : initParams.projectMembers, modules : initParams.modules});
                if (!!selectId) {
                    selectIteration(selectId, function () {
                        stopLoading();
                    });
                } else {
                    stopLoading();
                }


            }).catch(e => {
                error("后台拉取数据失败", JSON.stringify(e));

            });



        })



    }


    componentWillReceiveProps(nextProps, nextContext) {

        this.setState(nextProps.iteration);

        let iterationState = JSON.parse(JSON.stringify(this.state.iterationState));

        if(nextProps.action === CLOSE_ITERATION_FILTER || nextProps.action === OPEN_ITERATION_FILTER){
            return;
        }


        if(nextProps.action === DELETE_ITERATION){

            for (let i in iterationState) {
                let outer = iterationState[i];

                let delParent = false;

                if(outer.children.length === 1){
                    delParent = true;
                }

                for (let c in outer.children) {

                    if(outer.children[c].id === nextProps.deleteId){
                        iterationState[i].children.splice(c, 1);
                        if(delParent){
                            iterationState.splice(i, 1);
                        }
                    }
                }
            }
            this.setState({openAlert : false})
        }

        if(nextProps.action === SAVE_EDIT_ITERATION){

            console.log(JSON.stringify(iterationState));

            /**
             * [{
                "children": [{
                    "iter": "UPAC201905-02",
                    "selected": true,
                    "id": 1
                }],
                "iteration": {
                    "name": "UPAC201905",
                    "selected": true
                }
            }]
             */
            let newIteration = nextProps.iteration.iterationInfo.iterationCode.split("-");
            for (let i in iterationState) {

                let unit = iterationState[i];

                for(let j in unit.children){

                    if(unit.children[j].id === nextProps.iteration.iterationInfo.id){

                        unit.children[j].iter = nextProps.iteration.iterationInfo.iterationCode;

                    }



                }


            }


        }

        // 这里会返回新建后的版本号，这个版本号需要有一定的归类
        if (nextProps.action === SAVE_ADD_ITERATION) {
            let newIteration = nextProps.iteration.iterationInfo.iterationCode.split("-");
            let needNew = true;
            for (let i in iterationState) {
                if (iterationState[i].iteration.name === newIteration[0]) {
                    let unit = {
                        id: nextProps.iteration.iterationInfo.id,
                        iter: nextProps.iteration.iterationInfo.iterationCode,
                        selected: false
                    }
                    iterationState[i].children.push(unit);
                    needNew = false;
                }
            }
            if (needNew) {
                let newIteration = nextProps.iteration.iterationInfo.iterationCode.split("-")[0];
                let ret = {
                    iteration: {name: newIteration, selected: true},
                    children: [
                        {
                            id: nextProps.iteration.iterationInfo.id,
                            iter: nextProps.iteration.iterationInfo.iterationCode,
                            selected: false
                        }

                    ]
                };
                iterationState.push(ret);
            }
        }


        for (let i in iterationState) {
            let iter = iterationState[i];
            let selectedId = "";
            for (let j in iter.children) {
                if (iter.children[j].id === nextProps.iteration.iterationInfo.id) {
                    iter.children[j].selected = true;
                    selectedId = j;
                } else {
                    iter.children[j].selected = false;
                }
            }
            if (!!selectedId && iter.iteration.name === iter.children[selectedId].iter.split("-")[0]) {
                iter.iteration.selected = true;
            } else {
                iter.iteration.selected = false;
            }
        }


        this.setState({iterationState: iterationState});

    }

    handleReview = () =>{
        this.setState({tabValue: 1})
    };

    handleAllIteration = (e) =>{
        this.setState({allVersionSelected : true});
        this.deSelect();

    }

    getIterationTimeline = (ret, classes) => {

        return (<div>
                    版本时间轴

            <Tooltip title={<DemandIterationStepper steppers={ret}/>} leaveDelay={500} classes={{tooltip:classes.toolTipIteration}}>
                <IconButton style={{marginRight:"10px"}}>
                    <LinkIcon/>
                </IconButton>
            </Tooltip>

                </div>)
    }


    render() {
        const {classes, theme, initialData} = this.props;
        const {tabValue} = this.state;
        let self = this;
        return (
            <div>
                <Grid container spacing={8}>

                    <Grid item xs={12}>
                        <IterationList iterations={this.state.iterationState} handleAdd={this.handleAdd} handleAllIteration={this.handleAllIteration}
                                       handleEdit={this.handleEdit} handleSelected={this.handleSelected} handleDelete={this.handleAlertDelete}
                                       handleSearch={this.handleSearch} perm={this.state.perm} handleReview={this.handleReview} allVersionSelected={this.state.allVersionSelected}/>
                    </Grid>
                    <Grid item xs={12}>

                        {
                            this.state.allVersionSelected === true ?

                                <Paper style={{padding: "10px", boxShadow: "none"}}>
                                    <IterationTable handleSelection={this.handleSelected}/>
                                </Paper>

                                :

                                <Paper style={{padding: "10px", boxShadow: "none"}}>
                                    <Tabs value={tabValue} onChange={this.handleChange}
                                          classes={{indicator: classes.tabsIndicator}}>
                                        <Tab label="版本总览"/>
                                        <Tab label="需求列表"/>
                                        <Tab label="模块信息"/>
                                    </Tabs>

                                    {tabValue === 0 &&


                                    <Grid container spacing={8}>
                                        <Grid xs={12} style={{marginTop: "16px"}} item>

                                            <Card className={classes.card}>
                                                <CardHeader avatar={
                                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                                        T
                                                    </Avatar>
                                                } title={self.getIterationTimeline(this.props.relatedIterationInfo, classes)} className={classes.cardHeader}
                                                />

                                                <CardContent className={classes.cardContent}>
                                                    <IterationStepper
                                                        steppers={!!this.state.iterationInfo ? this.state.iterationInfo : {}}/>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid xs={6} item>
                                            <Card className={classes.card}>
                                                <CardHeader avatar={
                                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                                        P
                                                    </Avatar>
                                                } title="版本人员信息" className={classes.cardHeader}
                                                            action={
                                                                <IconButton style={{marginRight:"10px"}} onClick={self.handleUpdatePersonInfo.bind(this, this.state.iterationInfo.id)}>
                                                                    <AddIcon/>
                                                                </IconButton>
                                                            }
                                                />
                                                <CardContent className={classes.cardContent}>
                                                    <Grid container spacing={8}>
                                                        <Grid xs={6} item>
                                                            <div
                                                                className={classes.textInfo}>版本负责人：<Chip
                                                                label={this.state.iterationInfo.iterationOwner}
                                                                className={classes.chipStyle} style={{background: "#e0ecfb", color: "#176fdc",}}/></div>
                                                        </Grid>
                                                        <Grid xs={6} item>
                                                            <div
                                                                className={classes.textInfo}>上线负责人：<Chip
                                                                label={this.state.iterationInfo.deliveryPersonInCharge}
                                                                className={classes.chipStyle}/></div>
                                                        </Grid>
                                                        <Grid xs={12} item>
                                                            <div
                                                                className={classes.textInfo}>
                                                                上线人员：{!!this.state.iterationInfo && !!this.state.iterationInfo.deliveryPersons ? this.state.iterationInfo.deliveryPersons.map((value, index) => {
                                                                    return <Chip label={value} className={classes.chipStyle}
                                                                                 key={index}/>
                                                                }
                                                            ) : ""}
                                                            </div>
                                                        </Grid>
                                                        <Grid xs={12} item>
                                                            <div
                                                                className={classes.textInfo}>上线检查：
                                                                {!!this.state.iterationInfo && !!this.state.iterationInfo.deliveryCheckers ? this.state.iterationInfo.deliveryCheckers.map((value, index) => {
                                                                        return <Chip label={value} className={classes.chipStyle}
                                                                                     key={index}/>
                                                                    }
                                                                ) : ""}
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>

                                            </Card>
                                        </Grid>
                                        <Grid xs={6} item>
                                            <Card className={classes.card}>
                                                <CardHeader avatar={
                                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                                        R
                                                    </Avatar>
                                                } title="版本数据" className={classes.cardHeader}/>


                                                <CardContent className={classes.cardContent}>
                                                    <Grid container spacing={8}>
                                                        <Grid xs={6} item>
                                                            <div
                                                                className={classes.textInfo}>未提交方案：<Chip
                                                                label={this.state.iterationInfo.unPlanningCnt}
                                                                className={classes.chipStyle}/></div>
                                                        </Grid>
                                                        <Grid xs={6} item>
                                                            <div
                                                                className={classes.textInfo}>待走查方案：<Chip
                                                                label={this.state.iterationInfo.unCodeReviewCnt}
                                                                className={classes.chipStyle}/></div>
                                                        </Grid>
                                                        <Grid xs={6} item>
                                                            <div
                                                                className={classes.textInfo}>待持续集成：<Chip
                                                                label={this.state.iterationInfo.unCi}
                                                                className={classes.chipStyle}/></div>
                                                        </Grid>
                                                        <Grid xs={6} item>
                                                            <div
                                                                className={classes.textInfo}>已完成：<Chip
                                                                label={this.state.iterationInfo.finished}
                                                                className={classes.chipStyle}/></div>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>

                                            </Card>
                                        </Grid>

                                    </Grid>
                                    }
                                    {tabValue === 1 &&
                                    <DemandsList iterationId={!!this.state.iterationInfo ? this.state.iterationInfo.id : ""} data={this.state.demandList} perm={this.state.perm}/>

                                    }
                                    {tabValue === 2 &&

                                    <Grid container spacing={8}>
                                        <Grid item xs={12}>
                                            <Stats iterationId={!!this.props.iteration ? this.props.iteration.iterationInfo.id : ""} modules={this.state.modules}
                                            />
                                        </Grid>
                                    </Grid>
                                    }
                                </Paper>

                        }
                    </Grid>
                    <AddIteration
                        open={!!this.props.openAddIteration ? this.props.openAddIteration : false}
                        onClose={this.handleClickClose}
                        projectMembers={this.state.projectMembers}
                    />

                    <UpdatePersonInfo open={!!this.props.openUpdatePersonInfo ? this.props.openUpdatePersonInfo : false}
                                      projectMembers={this.state.projectMembers}
                    />

                    <ShowDevelopPlan/>

                    <ShowPublishDocument/>

                    <Dialog
                        open={this.state.openAlert}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            {"警告"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="">你确定要删除该版本，以及其对应的所有内容吗？</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDialogClose} color="primary">
                                取消
                            </Button>
                            <Button onClick={this.handleIterationDelete} color="primary">
                                好的
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </div>
        );
    }
}

IterationBoard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


// 从store里面取数据给组件
/**
 * iteration : 管理所有的组件
 * @param state
 * @returns {*}
 */
const
    mapStateToProps = (state) => {
        if (!state.reducer.iteration.iteration) {
            return {
                openAddIteration: state.reducer.iteration.openAddIteration,
                action: state.reducer.iteration.action,
                initIterationList: state.reducer.iteration.initIterationList

            };
        }
        return {
            iteration: state.reducer.iteration.iteration,
            relatedIterationInfo : state.reducer.iteration.iteration.relatedIterationInfo,
            iterationId: state.reducer.iteration.iteration.iterationInfo.id,
            openAddIteration: state.reducer.iteration.openAddIteration,
            action: state.reducer.iteration.action,
            initIterationList: state.reducer.iteration.initIterationList,
            deleteId : state.reducer.iteration.deleteId,
            openUpdatePersonInfo: state.reducer.iteration.openUpdatePersonInfo

        }
    };
export default connect(mapStateToProps)(    withStyles(styles, {withTheme: true})    (        IterationBoard    ));