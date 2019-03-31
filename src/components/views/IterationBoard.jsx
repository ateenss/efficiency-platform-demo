import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import IterationList from "../Iteration/IterationList";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import {selectIteration, addIteration, init} from "../../actions/IterationAction";
import AddIteration from "../Iteration/AddIteration";
import {ITERATION_INIT, SAVE_ADD_ITERATION} from "../../actions/types";
import DemandsList from "../Iteration/DemandsList";
import ShowDevelopPlan from "../Iteration/ShowDevDocuments";
import ShowPublishDocument from "../Iteration/ShowPublishDocument";
import IterationStepper from "../Iteration/IterationStepper";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import red from '@material-ui/core/colors/red';
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {getProjectMembers} from "../../actions/CommonAction";
import {pullBuildProjectInitial} from "../../actions/BuildProjectAction";


const drawerWidth = 240;

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
        margin: theme.spacing.unit * 2

    },
    avatar: {
        backgroundColor: red[500],
        width: "32px",
        height: "32px"
    },
    cardHeader: {
        padding: theme.spacing.unit
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
    }
});


class IterationBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            iterationInfo: {},
            tabValue: 0,
            hide: true
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
    handleSelected = (id) => {
        console.log(id);
        // dispatch一个ID过去，获取该版本下的所有需求，然后选中
        selectIteration(id);
    };

    deSelect = () => {
        let iterationState = this.state.iterationState;
        for (let i in iterationState) {
            let iter = iterationState[i];
            for (let j in iter.children) {
                iter.children[j].selected = false;
            }
        }
    };
    //
    // handleEditPerson = () =>{
    //
    //     //this.state.iterationName;
    //
    //     addIterationPerson(this.state.iterationName);
    //
    // };


    componentDidMount() {

        let self = this;
        init(function (ret) {

            let iterationState = [];
            for (let i in ret) {
                let iter = ret[i];

                let parent = {};
                let iterationChildren = [];
                for (let j in iter.children) {
                    let selected = false;
                    if (i == 0 && j == 0) {
                        selected = true;
                    }
                    iterationChildren.push({iter: iter.children[j].name, selected: true, id : iter.children[j].id});

                    if (i == 0 && j == 0) {
                        selectIteration(iter.children[j].id);
                    }
                }

                parent.children = iterationChildren;
                parent.iteration = {name: iter.iteration, selected: false};
                iterationState.push(parent);
            }
            self.setState({iterationState: iterationState});

            getProjectMembers();

        });


    }


    componentWillReceiveProps(nextProps, nextContext) {

        this.setState(nextProps.iteration);


        let iterationState = JSON.parse(JSON.stringify(this.state.iterationState));
        // 这里会返回新建后的版本号，这个版本号需要有一定的归类
        if (nextProps.action === SAVE_ADD_ITERATION) {
            let newIteration = nextProps.iterationName.split(".");
            let needNew = true;
            for (let i in iterationState) {
                if (iterationState[i].iteration.name === newIteration[0]) {
                    let unit = {
                        iter: nextProps.iterationName,
                        selected: false
                    }
                    iterationState[i].children.push(unit);
                    needNew = false;
                }
            }
            if (needNew) {
                let newIteration = nextProps.iterationName.split(".")[0];
                let ret = {
                    iteration: {name: newIteration, selected: true},
                    children: [
                        {
                            iter: nextProps.iterationName,
                            selected: false
                        }

                    ]
                };
                iterationState.push(ret);
            }
        }

        for (let i in iterationState) {
            let iter = iterationState[i];
            for (let j in iter.children) {
                if (iter.children[j].id === nextProps.iteration.iterationInfo.id) {
                    iter.children[j].selected = true;
                } else {
                    iter.children[j].selected = false;
                }
            }
        }

        this.setState({iterationState: iterationState});

    }

    render() {
        const {classes, theme, initialData} = this.props;
        const {tabValue} = this.state;
        return (
            <div>
                <Grid container spacing={8}>

                    <Grid item xs={2}>
                        <IterationList iterations={this.state.iterationState} handleAdd={this.handleAdd}
                                       handleEdit={this.handleEdit} handleSelected={this.handleSelected}
                                       handleSearch={this.handleSearch}/>
                    </Grid>
                    <Grid item xs={10}>
                        <Paper style={{padding: "10px"}}>
                            <Tabs value={tabValue} onChange={this.handleChange}>
                                <Tab label="版本总览"/>
                                <Tab label="需求列表"/>
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
                                                    <Typography
                                                        className={classes.textInfo}>版本负责人：{this.state.iterationInfo.iterationOwner}</Typography>
                                                </Grid>
                                                <Grid xs={6} item>
                                                    <Typography
                                                        className={classes.textInfo}>上线负责人：{this.state.iterationInfo.deliveryPersonInCharge}</Typography>
                                                </Grid>
                                                <Grid xs={6} item>
                                                    <Typography
                                                        className={classes.textInfo}>上线人员：{this.state.iterationInfo.deliveryPersonInCharge}</Typography>
                                                </Grid>
                                                <Grid xs={6} item>
                                                    <Typography
                                                        className={classes.textInfo}>检查人员：{this.state.iterationInfo.deliveryPersonInCharge}</Typography>
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
                                                    <Typography
                                                        className={classes.textInfo}>未提交方案：{this.state.iterationInfo.unPlanningCnt}</Typography>
                                                </Grid>
                                                <Grid xs={6} item>
                                                    <Typography
                                                        className={classes.textInfo}>待走查方案：{this.state.iterationInfo.unCodeReviewCnt}</Typography>
                                                </Grid>
                                                <Grid xs={6} item>
                                                    <Typography
                                                        className={classes.textInfo}>待持续集成：{this.state.iterationInfo.unCi}</Typography>
                                                </Grid>
                                                <Grid xs={6} item>
                                                    <Typography
                                                        className={classes.textInfo}>已完成：{this.state.iterationInfo.finished}</Typography>
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
                        </Paper>


                    </Grid>
                    <AddIteration
                        open={!!this.props.openAddIteration ? this.props.openAddIteration : false}
                        onClose={this.handleClickClose}
                        projectMembers={this.props.projectMembers}
                    />
                    <ShowDevelopPlan/>

                    <ShowPublishDocument/>
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
                iterationName: state.reducer.iteration.iterationName,
                action: state.reducer.iteration.action,
                initIterationList: state.reducer.iteration.initIterationList,
                projectMembers : state.reducer.common.projectMembers

            };
        }
        return {
            iteration: state.reducer.iteration.iteration,
            iterationName: state.reducer.iteration.iteration.iterationName,
            openAddIteration: state.reducer.iteration.openAddIteration,
            action: state.reducer.iteration.action,
            initIterationList: state.reducer.iteration.initIterationList,
            projectMembers : state.reducer.common.projectMembers


        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        IterationBoard
    ))
;

