import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import IterationList from "../Iteration/IterationList";
import {Paper} from "@material-ui/core";
import {connect} from "react-redux";
import {selectIteration, addIteration, init, deleteIteration, search} from "../../actions/IterationAction";
import AddIteration from "../Iteration/AddIteration";
import {
    CLOSE_ITERATION_FILTER,
    DELETE_ITERATION,
    ITERATION_INIT,
    OPEN_ITERATION_FILTER,
    SAVE_ADD_ITERATION
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
import {startLoading, stopLoading} from "../../actions/CommonAction";
import permProcessor from "../../constants/PermProcessor";
import Chip from "@material-ui/core/Chip";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import IterationTable from "../Iteration/IterationTable";

const drawerWidth = 240;


const data = [
    {name: 'ACP_GTW_WEB', uv: 20},
    {name: 'ACP_GTW_APP', uv: 26},
    {name: 'ACAOS', uv: 23},
    {name: 'ACP_GTW_BKE', uv: 12},
];
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
        margin: theme.spacing.unit * 2,
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
        background: "#f5f5f5",
        color: "#232323",
        margin: "5px",
        fontSize: "14px"
    },
    tabsIndicator: {
        backgroundColor: '#4DAF7C',

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
            perm: permProcessor.init('project'),
            openAlert:false,
            currentIteration : "",
            allVersionSelected : false
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

    handleAdd = () => {
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
        this.setState({openAlert:true, currentIteration:id})
    };

    handleIterationDelete= () =>{

        let iterationId = this.state.currentIteration;

        deleteIteration(iterationId);

    };




    handleSelected = (id) => {
        console.log(id);
        // dispatch一个ID过去，获取该版本下的所有需求，然后选中
        selectIteration(id);
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
    //
    // handleEditPerson = () =>{
    //
    //     //this.state.iterationCode;
    //
    //     addIterationPerson(this.state.iterationCode);
    //
    // };

    componentWillMount() {

        startLoading();
    }

    componentDidMount() {

        let self = this;
        init(function (ret) {
            let iterationState = [];

            let selectId = "";
            for (let i in ret) {
                let iter = ret[i];

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

            self.setState({iterationState: iterationState});
            if (!!selectId) {
                selectIteration(selectId, function () {
                    stopLoading();
                });
            } else {
                stopLoading();
            }

        });


    }


    componentWillReceiveProps(nextProps, nextContext) {

        this.setState(nextProps.iteration);

        let iterationState = JSON.parse(JSON.stringify(this.state.iterationState));

        if(nextProps.action === CLOSE_ITERATION_FILTER || nextProps.action === OPEN_ITERATION_FILTER){
            return;
        }


        if(nextProps.action === DELETE_ITERATION){

            for (let i in iterationState) {
                for (let c in iterationState[i].children) {
                    let delParent = false;
                    if(iterationState[i].children.length == 1){
                        delParent = true;
                    }
                    if(iterationState[i].children[c].id === nextProps.deleteId){
                        delete iterationState[i].children[c];
                        delete iterationState[i];
                    }
                }
            }
            this.setState({openAlert : false})
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

    handleAllIteration = () =>{

        this.setState({allVersionSelected : true});
        this.deSelect();

    }

    render() {
        const {classes, theme, initialData} = this.props;
        const {tabValue} = this.state;
        return (
            <div>
                <Grid container spacing={16}>

                    <Grid item xs={2}>
                        <IterationList iterations={this.state.iterationState} handleAdd={this.handleAdd} handleAllIteration={this.handleAllIteration}
                                       handleEdit={this.handleEdit} handleSelected={this.handleSelected} handleDelete={this.handleAlertDelete}
                                       handleSearch={this.handleSearch} perm={this.state.perm} handleReview={this.handleReview} allVersionSelected={this.state.allVersionSelected}/>
                    </Grid>
                    <Grid item xs={10}>

                        {
                            this.state.allVersionSelected === true ?

                                <Paper style={{padding: "10px", boxShadow: "none"}}>
                                    <IterationTable/>
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
                                            } title="版本时间轴" className={classes.cardHeader}/>

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
                                            } title="版本人员信息" className={classes.cardHeader}/>

                                            <CardContent className={classes.cardContent}>
                                                <Grid container spacing={8}>
                                                    <Grid xs={6} item>
                                                        <div
                                                            className={classes.textInfo}>版本负责人：<Chip
                                                            label={this.state.iterationInfo.iterationOwner}
                                                            className={classes.chipStyle}/></div>
                                                    </Grid>
                                                    <Grid xs={6} item>
                                                        <div
                                                            className={classes.textInfo}>上线负责人：<Chip
                                                            label={this.state.iterationInfo.deliveryPersonInCharge}
                                                            className={classes.chipStyle}/></div>
                                                    </Grid>
                                                    <Grid xs={6} item>
                                                        <div
                                                            className={classes.textInfo}>
                                                            上线人员：{!!this.state.iterationInfo && !!this.state.iterationInfo.deliveryPersons ? this.state.iterationInfo.deliveryPersons.map((value, index) => {
                                                                return <Chip label={value} className={classes.chipStyle}
                                                                             key={index}/>
                                                            }
                                                        ) : ""}
                                                        </div>
                                                    </Grid>
                                                    <Grid xs={6} item>
                                                        <div
                                                            className={classes.textInfo}>上线人员：
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
                                <DemandsList data={this.state.demandList}/>

                                }
                                {tabValue === 2 &&

                                <Grid container spacing={8}>
                                    <Grid item xs={12}>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <BarChart
                                                data={data}
                                                margin={{top: 20, right: 20, bottom: 20, left: 100}}
                                                layout="vertical"
                                            >
                                                <XAxis type="number"/>
                                                <YAxis dataKey="name" type="category"/>
                                                <Tooltip/>
                                                <Legend/>
                                                <Bar dataKey="uv" name="工作量" fill="#4DAF7C" maxBarSize={20}
                                                     label={{fill: "#F5F5F5"}}/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Grid>
                                </Grid>
                                }
                            </Paper>

                        }
                    </Grid>
                    <AddIteration
                        open={!!this.props.openAddIteration ? this.props.openAddIteration : false}
                        onClose={this.handleClickClose}
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
                iterationCode: state.reducer.iteration.iterationCode,
                action: state.reducer.iteration.action,
                initIterationList: state.reducer.iteration.initIterationList

            };
        }
        return {
            iteration: state.reducer.iteration.iteration,
            iterationCode: state.reducer.iteration.iteration.iterationCode,
            openAddIteration: state.reducer.iteration.openAddIteration,
            action: state.reducer.iteration.action,
            initIterationList: state.reducer.iteration.initIterationList,
            deleteId : state.reducer.iteration.deleteId

        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        IterationBoard
    ))
;

