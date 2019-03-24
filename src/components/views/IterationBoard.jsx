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

const drawerWidth = 240;

const styles = theme => ({
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: "50px"
    },
    toolbarHead: {
        backgroundColor: "#FFFFFF",
        boxShadow: "none"
    }
});



class IterationBoard extends React.Component {
    state = {
        open: false,
        tabValue: 0
    };


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


    componentDidMount() {

        let self = this;
        init(function(ret){

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
                    iterationChildren.push({iter: iter.children[j], selected: true});
                }

                parent.children = iterationChildren;
                parent.iteration = {name: iter.iteration, selected: false};
                iterationState.push(parent);
            }
            self.setState({iterationState: iterationState});
            self.setState(self.props.iteration);

        });


    }


    componentWillReceiveProps(nextProps, nextContext) {

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
                if (iter.children[j].iter === nextProps.iterationName) {
                    iter.children[j].selected = true;
                } else {
                    iter.children[j].selected = false;
                }
            }
        }
        this.setState({iterationState: iterationState});

    }

    render() {
        const {classes, theme, openAddIteration, initialData} = this.props;
        const {tabValue} = this.state;

        return (
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

                            <IterationStepper steppers={!!this.state.iterationInfo ? this.state.iterationInfo : {}}/>

                        }
                        {tabValue === 1 &&
                            <DemandsList data={this.state.demandList}/>

                        }
                    </Paper>


                </Grid>
                <AddIteration
                    open={this.props.openAddIteration}
                    onClose={this.handleClickClose}
                    randomNum={this.state.randomNum}
                />
                <ShowDevelopPlan/>

                <ShowPublishDocument/>
            </Grid>

        );
    }
}


IterationBoard.defaultProps = {


    iteration: {
        iterationInfo: {
            iterationOwner: "周伯通",
            testDate: "2019/03/01",
            publishDate: "2019/03/01",
            deliveryDate: "2019/03/01",
            developPlanSubmitDate: "2019/03/01",
            codeReviewDate: "2019/03/01",
            ciDate: "2019/03/01",
        },
        demandList: [
            ["YDZF-201809-12", "快速收款码需求这个需求很厉害", "张飞", "开发中", "Jack", "云闪付", "2019-03-13", "是"],
            ["TYDZF-201809-13", "ApplePayOnweb需求", "韦小宝", "已完成", "Jack", "云闪付", "2019-03-13", "是"],
            ["YDZF-201809-15", "你说这是什么需求", "张无忌", "提测", "Jack", "云闪付", "2019-03-13", "是"],
            ["YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始", "Jack", "云闪付", "2019-03-13", "是"],
            ["YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始", "Jack", "云闪付", "2019-03-13", "是"],

            ["YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始", "Jack", "云闪付", "2019-03-13", "是"],
            ["YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始", "Jack", "云闪付", "2019-03-13", "是"],

            ["YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始", "Jack", "云闪付", "2019-03-13", "是"],

            ["YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始", "Jack", "云闪付", "2019-03-13", "是"],


        ]
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
        console.log("!!!!!!!!" + JSON.stringify(state.reducer.iteration));
        if (!state.reducer.iteration.iteration) {
            return {
                openAddIteration: state.reducer.iteration.openAddIteration,
                iterationName: state.reducer.iteration.iterationName,
                action: state.reducer.iteration.action,
                initIterationList : state.reducer.iteration.initIterationList
            };
        }
        return {
            iteration: state.reducer.iteration.iteration,
            iterationName: state.reducer.iteration.iteration.iterationName,
            openAddIteration: state.reducer.iteration.openAddIteration,
            action: state.reducer.iteration.action,
            initIterationList : state.reducer.iteration.initIterationList


        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        IterationBoard
    ))
;

